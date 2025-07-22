import { NextFunction, Request, Response } from "express"
import { env } from "../config/env"
import AppError from "../errorHelpers/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err : any ,req : Request, res : Response, next : NextFunction ) =>{

    let statusCode =  500;
    let message = "Something went wrong";

    if(err.code ===11000){

       const  duplicate = err.message.match(/"([^"]*)"/);
        statusCode = 400;
        message = `${duplicate[1] } already exists`;
    }
    else if(err.name ==="CastError"){

        statusCode = 400;
        message = `Invalid Mongodb ObjectId : ${err.value}`;
    }
    else if(err.name === "ValidationError"){
        statusCode = 400;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message = Object.values(err.errors).map((val: any) => val.message).join(", ");
    }
    else if(err instanceof AppError){

        statusCode = err.statusCode;
        message = err.message;
    }
    else if(err instanceof Error){
        statusCode = 500;
        message = err.message

    }
        res.status(statusCode).json({
            success : false,
            message,
            err,
            stack : env.NODE_ENV === 'development' ? err.stack : null

        })
}