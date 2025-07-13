import { NextFunction, Request, Response } from "express"
import { env } from "../config/env"
import AppError from "../errorHelpers/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err : any ,req : Request, res : Response, next : NextFunction ) =>{

    let statusCode =  500;
    let message = "Something went wrong";
    if(err instanceof AppError){

        statusCode = err.statusCode;
        message = err.message;
    }
        res.status(statusCode).json({
            success : false,
            message,
            err,
            stack : env.NODE_ENV === 'development' ? err.stack : null

        })
}