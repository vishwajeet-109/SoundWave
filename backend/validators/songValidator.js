import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Song Validator
|--------------------------------------------------------------------------
*/

export const createSongValidator = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2, max: 150 })
        .withMessage("Title must be between 2 and 150 characters"),

    body("genre")
        .trim()
        .notEmpty()
        .withMessage("Genre is required"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("language")
        .trim()
        .notEmpty()
        .withMessage("Language is required"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters"),

    body("lyrics")
        .optional()
        .trim(),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array")

];

/*
|--------------------------------------------------------------------------
| Update Song Validator
|--------------------------------------------------------------------------
*/

export const updateSongValidator = [

    body("title")
        .optional()
        .trim()
        .isLength({ min: 2, max: 150 })
        .withMessage("Title must be between 2 and 150 characters"),

    body("genre")
        .optional()
        .trim(),

    body("category")
        .optional()
        .trim(),

    body("language")
        .optional()
        .trim(),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters"),

    body("lyrics")
        .optional()
        .trim(),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array")

];