"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const myUserController_1 = __importDefault(require("../Controllers/myUserController"));
const auth_1 = require("../Middlewere/auth");
const validation_1 = require("../Middlewere/validation");
const router = express_1.default.Router();
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, myUserController_1.default.getCurrentUser);
//when comes from api/my/user and if it is post request, it will use the below
//athenticated backend endpoint
// jwtcheck -> based on the  credentials when we create the account
//jwtparse -> pick access token and get info
//validateMyUserRequest -> making sure that there are no fields are missing
router.post("/", auth_1.jwtCheck, myUserController_1.default.createCurrentUser);
//update current user (since we are creating the user here too)
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, myUserController_1.default.updateCurrentUser);
exports.default = router;
