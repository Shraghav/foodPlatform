import { Request, Response } from "express";
import User from "../model/user";
//handles post request
const createCurrentUser = async (req:Request, res:Response) => {
    //1) check user exists
    //2) create user if not exists
    //3) return the user object to calling client
    try {
        const { auth0Id } = req.body;
        //finding user with auth0 id
        const existingUser = await User.findOne({ auth0Id })
        if (existingUser) {
            return res.status(200).send();
        }
        //has auth0 id and email stuffs
        //sending the details after they finsihed logging in and storing in the db
        const newUser = new User(req.body);
        await newUser.save();
        // returning the object after everything
        res.status(201).json(newUser.toObject())
    }
    
    catch (error) {
        console.log(error);
        //don't send the above error to front end as  it might contain sensitive info
        res.status(500).json({message: "Error Creating the user"})
    }
}

export default {
    createCurrentUser,
};