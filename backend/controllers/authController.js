import authService from "../services/authService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cookieOptions from "../utils/cookieOptions.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);

    res.status(201).json(
      new ApiResponse(201, "Registration successful", {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password, req);

    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    res.status(200).json(
      new ApiResponse(200, "Login successful", {
        accessToken: result.accessToken,
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
      })
    );
  });

  logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    await authService.logout(refreshToken);

    res.clearCookie("refreshToken");
    res.status(200).json(new ApiResponse(200, "Logout successful"));
  });

  logoutAll = asyncHandler(async (req, res) => {
    await authService.logoutAll(req.user._id);

    res.clearCookie("refreshToken");
    res.status(200).json(new ApiResponse(200, "Logged out from all devices"));
  });

  me = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.user._id);
    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
  });

  forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);

    const payload =
      process.env.NODE_ENV === "development" && result.resetToken
        ? { resetToken: result.resetToken }
        : null;

    res.status(200).json(new ApiResponse(200, result.message, payload));
  });

  resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    const result = await authService.resetPassword(token, password);
    res.status(200).json(new ApiResponse(200, result.message));
  });

  changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user._id, currentPassword, newPassword);
    res.status(200).json(new ApiResponse(200, result.message));
  });

  generateVerification = asyncHandler(async (req, res) => {
    const result = await authService.generateEmailVerification(req.user._id);

    const payload =
      process.env.NODE_ENV === "development" && result.verificationToken
        ? { verificationToken: result.verificationToken }
        : null;

    res.status(200).json(new ApiResponse(200, result.message, payload));
  });

  verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    const result = await authService.verifyEmail(token);
    res.status(200).json(new ApiResponse(200, result.message));
  });

  refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = await authService.refresh(refreshToken);

    res.status(200).json(new ApiResponse(200, "Token refreshed", { accessToken }));
  });
}

export default new AuthController();