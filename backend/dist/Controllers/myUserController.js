"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../model/user"));
//handles post request
const createCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //1) check user exists
    //2) create user if not exists
    //3) return the user object to calling client
    try {
        const { auth0Id } = req.body;
        //finding user with auth0 id
        const existingUser = yield user_1.default.findOne({ auth0Id });
        if (existingUser) {
            return res.status(200).send();
        }
        //has auth0 id and email stuffs
        //sending the details after they finsihed logging in and storing in the db
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        // returning the object after everything
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        //don't send the above error to front end as  it might contain sensitive info
        res.status(500).json({ message: "Error Creating the user" });
    }
});
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //form data
        const { name, address, country, city } = req.body;
        //get auth0 id from the token
        const user = yield user_1.default.findById(req.userId); //the token which is decoded
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        user.name = name;
        user.address = address;
        user.city = city;
        user.country = country;
        yield user.save();
        res.send(user); //they can do whatever they want with the properties and easier to check in postman too
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(401).json({ message: "User not found" });
        }
        res.json(currentUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
};
