import { Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req : Request, res : Response) => {

    try{
        const { name, email } = req.body;
        const user = await User.create({
            name,
            email })

            res.status(201).json({
                message: "User created successfully", user})
    }
    catch(error : unknown){
        console.log("Error creating user:", error);
        res.status(400).json({ message: "something went wrong" });
    }
}


export const UserController = {
    createUser }