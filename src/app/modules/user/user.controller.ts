import { Request, Response } from "express";

import { userServices } from "./user.services";

const createUser = async (req : Request, res : Response) => {

    try{
        
        const user = await userServices.createUser(req.body);

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