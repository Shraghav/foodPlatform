import express from "express";
import myUserController from "../Controllers/myUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();
// router.get("/",myUserController.getCurrentUser);
//when comes from api/my/user and if it is post request, it will use the below
//athenticated backend endpoint
// jwtcheck -> based on the  credentials when we create the account
//jwtparse -> pick access token and get info
//validateMyUserRequest -> making sure that there are no fields are missing
router.post("/",myUserController.createCurrentUser);

//update current user (since we are creating the user here too)
// router.put(
//   "/",
//   jwtCheck,
//   jwtParse,
//   validateMyUserRequest,
//   myUserController.updateCurrentUser
// );
export default router;
