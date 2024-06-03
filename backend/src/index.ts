import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./Routes/myUserRoutes"
mongoose.connect(process.env.mongodb_connection_string as string).then(() => {
  console.log("Connected to db");
});
const app = express() // creates appserver
app.use(express.json()) //add middleware converts body of the request to  json
app.use(cors())

//health
app.get("/health", async (req: Request, res: Response) => {
  res.send({ messsage: "health Okay" }); //simply to check if the server is started
})
//parsing to myuserroute
app.use("/api/my/user", myUserRoutes);

app.listen(5000, () => {
    console.log("Server running at 5000");
})