import express from "express";
import myUserController from "../Controllers/myUserController";

const router = express.Router();
//when comes from api/my/user and if it is post request, it will use the below
router.post("/", myUserController.createCurrentUser);

export default router