import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 }),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
export const loginValidator = [

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

];
export const forgotPasswordValidator = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email")

];

export const resetPasswordValidator = [

    body("token")
        .trim()
        .notEmpty()
        .withMessage("Reset token is required"),

    body("password")
        .trim()
        .isLength({ min: 8 })
        .withMessage(
            "Password must be at least 8 characters"
        )

];

export const changePasswordValidator = [

    body("currentPassword")
        .trim()
        .notEmpty()
        .withMessage("Current password is required"),

    body("newPassword")
        .trim()
        .isLength({ min: 8 })
        .withMessage(
            "New password must be at least 8 characters"
        )

];