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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const myUserRoutes_1 = __importDefault(require("./Routes/myUserRoutes"));
mongoose_1.default.connect(process.env.mongodb_connection_string).then(() => {
    console.log("Connected to db");
});
const app = (0, express_1.default)(); // creates appserver
app.use(express_1.default.json()); //add middleware converts body of the request to  json
app.use((0, cors_1.default)());
//health
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ messsage: "health Okay" }); //simply to check if the server is started
}));
//parsing to myuserroute
app.use("/api/my/user", myUserRoutes_1.default);
app.listen(5000, () => {
    console.log("Server running at 5000");
});

//typescript is converted to js