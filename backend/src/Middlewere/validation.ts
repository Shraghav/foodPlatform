import { NextFunction,Request,Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationError = async (req: Request, res: Response,next:NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error:error.array()})
    }
    next(); //pass to controller for updating user profile
}
//receive request to update the file
export const validateMyUserRequest = [
    //checks body
    //adds as middlewere to routes
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("address").isString().notEmpty().withMessage("Address must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationError
]

//keeps out of business logic