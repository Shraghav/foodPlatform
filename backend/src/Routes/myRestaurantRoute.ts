import express from "express";
import multer from "multer";
import myRestaurantController from "../Controllers/myRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

// /api/my/restaurant
router.post(
  "/",
  upload.single("imagefile"),
  validateMyRestaurantRequest,
  jwtCheck, //getting valid token in request
  jwtParse, //fills logged in info and passes to request
  myRestaurantController.createMyRestaurant
);

export default router;
