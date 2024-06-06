import { Request, Response } from "express";
import Restaurant from "../model/restuarant";
import cloudinary from "cloudinary"
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingUser = await Restaurant.findOne({ user: req.userId });
        if (existingUser) {
            return res.status(409).json({message: "User Restaurant already exists"})
        }
        //create a data string that represents the image that we caught in the request
        //get image
        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        //mimetype -> type  of the image
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;
        
        //uploading the image to cloudnary
        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI); //give back an PI response and assign to upload response variable

        //new restaurant based on the model
        const restaurant = new Restaurant(req.body); //all items
        restaurant.imageUrl = uploadResponse.url;
        //providing a link 
        restaurant.user = new mongoose.Types.ObjectId(req.userId);

        restaurant.lastUpdated = new Date();
        await restaurant.save();

        //calling clients can have everything in the restaurant
        res.status(201).send(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export default {
    createMyRestaurant,
}