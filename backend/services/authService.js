import User from "../models/User.js";
import Artist from "../models/Artist.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import Session from "../models/Session.js";
import sessionService from "./sessionService.js";
import hashToken from "../utils/hashToken.js";
import crypto from "crypto";
import generateRandomToken from "../utils/generateRandomToken.js";

class AuthService {
  async register(data) {
    const email = data.email.toLowerCase().trim();

    const exists = await User.findOne({ email });

    if (exists) {
      throw new ApiError(409, "Email already exists");
    }

    // 1. User create karein (role agar data mein nahi hai toh default 'user' ya schema default uthayega)
    const user = await User.create({
      name: data.name,
      email,
      password: data.password,
      role: data.role || ROLES.USER, // Ensure ROLES constant ya string properly mapped ho
    });

    // 2. Agar registered user ka role ARTIST hai, toh 'artists' collection mein entry banayein
    if (user.role === ROLES.ARTIST) {
      await Artist.create({
        user: user._id, // User ki id se link karein
        name: user.name, // Initial name sync
      });
    }

    return user;
  }



async login(email, password, req) {
    // 1. Find user and get password hash
    const user = await User.findOne({
        email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    // 2. Compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    // 3. Generate Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 4. Create Session
    await sessionService.create({
        user: user._id,
        refreshToken: hashToken(refreshToken),
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        expiresAt: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        )
    });

    // 5. Update Last Login
    user.lastLogin = new Date();
    await user.save();

    // ==========================================
    // SECURITY FIX: Remove password before sending to frontend
    // ==========================================
    user.password = undefined;

    // 6. Return secure response
    return {
        accessToken,
        refreshToken,
        user
    };
}

async logout(refreshToken){

    if(!refreshToken){

        return;

    }

    const hashedToken = hashToken(refreshToken);

    await sessionService.deleteByToken(hashedToken);

}

async logoutAll(userId){

    await sessionService.deleteAll(userId);

}

async refresh(refreshToken){

    if(!refreshToken){

        throw new ApiError(401,"Refresh token missing");

    }

    const decoded = jwt.verify(

        refreshToken,

        process.env.JWT_REFRESH_SECRET

    );

    const session = await Session.findOne({

        refreshToken: hashToken(refreshToken)

    }).populate("user");

    if(!session){

        throw new ApiError(

            401,

            "Invalid session"

        );

    }

    const accessToken = generateAccessToken(

        session.user

    );

    return accessToken;

}

async forgotPassword(email) {

    const user = await User.findOne({
        email: email.toLowerCase().trim()
    });

    // Security: email exist kare ya na kare,
    // same response return karenge
    if (!user) {
        return {
            success: true,
            message:
                "If an account exists, a password reset link has been sent."
        };
    }

    // Generate plain token
    const resetToken = generateRandomToken();

    // Hash token before storing
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.passwordResetToken = hashedToken;

    // Token valid for 15 minutes
    user.passwordResetExpires = new Date(
        Date.now() + 15 * 60 * 1000
    );

    await user.save();

    // TODO:
    // emailService.sendPasswordResetEmail(
    //     user.email,
    //     resetToken
    // );

    return {
        success: true,
        message:
            "If an account exists, a password reset link has been sent.",
        resetToken, // Development only. Production me remove kar denge.
    };

}

async resetPassword(token, newPassword) {

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: new Date()
        }
    }).select("+password");

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired reset token"
        );
    }

    user.password = newPassword;

    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    user.refreshToken = null;
    user.passwordChangedAt = new Date();

    await user.save();

    return {
        success: true,
        message: "Password reset successful"
    };
}

async changePassword(userId, currentPassword, newPassword) {

    const user = await User.findById(userId)
        .select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
        throw new ApiError(
            400,
            "Current password is incorrect"
        );
    }

    if (currentPassword === newPassword) {
        throw new ApiError(
            400,
            "New password must be different"
        );
    }

    user.password = newPassword;

    user.passwordChangedAt = new Date();

    await user.save();

    return {
        success: true,
        message: "Password changed successfully"
    };

}

async generateEmailVerification(userId) {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.emailVerified) {
        throw new ApiError(400, "Email already verified");
    }

    const verificationToken = generateRandomToken();

    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    user.emailVerificationToken = hashedToken;

    user.emailVerificationExpires = new Date(
        Date.now() + 24 * 60 * 60 * 1000
    );

    await user.save();

    // TODO:
    // emailService.sendVerificationEmail(
    //     user.email,
    //     verificationToken
    // );

    return {
        success: true,
        message: "Verification email generated",
        verificationToken
    };

}

async verifyEmail(token) {

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({

        emailVerificationToken: hashedToken,

        emailVerificationExpires: {
            $gt: new Date()
        }

    });

    if (!user) {

        throw new ApiError(

            400,

            "Invalid or expired verification token"

        );

    }

    user.emailVerified = true;

    user.emailVerificationToken = null;

    user.emailVerificationExpires = null;

    await user.save();

    return {

        success: true,

        message: "Email verified successfully"

    };

}

async getCurrentUser(userId) {
  const user = await User.findById(userId).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}

}



export default new AuthService();