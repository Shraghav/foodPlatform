import express from "express";
import multer from "multer"
import myRestaurantController from "../Controllers/myRestaurantController";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize : 5 * 1024 *1024 //5mb 
        }
    }
)

// /api/my/restaurant
router.post("/", upload.single("imagefile"),
    myRestaurantController.createMyRestaurant)

export default router;