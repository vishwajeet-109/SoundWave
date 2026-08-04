import express from "express";

import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    changePasswordValidator
} from "../validators/authValidator.js";

import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  authController.register
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  authController.login
);
router.get(

"/me",

authMiddleware,

authController.me

);

router.post(

"/logout",

authController.logout

);

router.post(

"/logout-all",

authMiddleware,

authController.logoutAll

);

router.post(

    "/forgot-password",

    forgotPasswordValidator,

    validateRequest,

    authController.forgotPassword

);

router.post(
    "/reset-password",
    resetPasswordValidator,
    validateRequest,
    authController.resetPassword
);

router.post(

    "/change-password",

    authMiddleware,

    changePasswordValidator,

    validateRequest,

    authController.changePassword

);


router.post(

    "/generate-verification",

    authMiddleware,

    authController.generateVerification

);

router.get(

    "/verify-email",

    authController.verifyEmail

);


router.post(

"/refresh",

authController.refresh

);

export default router;