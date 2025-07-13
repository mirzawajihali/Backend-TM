import { NextFunction, Request, Response } from "express";

import { userServices } from "./user.services";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createUser = async (req : Request, res : Response, next : NextFunction) => {

    try{

        throw new AppError(httpStatus.BAD_REQUEST, "Invalid user data");
        
        const user = await userServices.createUser(req.body);

            res.status(201).json({
                message: "User created successfully", user})
    }
    catch(error : unknown){
        console.log("Error creating user:", error);
        next(error);
    }
}


export const UserController = {
    createUser }