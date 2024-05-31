import express from "express";
import myUserController from "../Controllers/myUserController";
import { jwtCheck } from "../Middlewere/auth";

const router = express.Router();
//when comes from api/my/user and if it is post request, it will use the below
//athenticated backend endpoint
router.post("/",jwtCheck, myUserController.createCurrentUser);

export default router