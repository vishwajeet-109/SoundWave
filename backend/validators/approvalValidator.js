import { body } from "express-validator";

export const rejectSongValidator = [

    body("reason")

        .trim()

        .notEmpty()

        .withMessage("Reject reason is required")

        .isLength({

            min: 5,

            max: 300

        })

        .withMessage(
            "Reason must be between 5 and 300 characters"
        )

];