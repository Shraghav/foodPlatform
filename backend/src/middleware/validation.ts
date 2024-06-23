import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationError = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  next(); //pass to controller for updating user profile
};
//receive request to update the file
export const validateMyUserRequest = [
  //checks body
  //adds as middlewere to routes
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("address").isString().notEmpty().withMessage("Address must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationError,
];

//keeps out of business logic

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is needed"),
  body("city").notEmpty().withMessage("City name is needed"),
  body("country").notEmpty().withMessage("Country name is needed"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("DeliveryPrice must be positive"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time  must be positive"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a positive number"),
  handleValidationError,
];
