import  { NextFunction, Request, Response } from "express"
import { env } from "../config/env"
import AppError from "../errorHelpers/AppError";
import { handleCastError } from "../helpers/handleCastError";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleValidationError } from "../helpers/handleValidationError";
import { handleZodError } from "../helpers/handleZodError";
import { TErrorSources } from "../interfaces/error.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err : any ,req : Request, res : Response, next : NextFunction ) =>{

    if(env.NODE_ENV === 'production') {
        console.log(err)
    }

    let statusCode =  500;
    let message = "Something went wrong";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorSources: TErrorSources[] | undefined;


    if(err.code ===11000){
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;

    }
    else if(err.name ==="CastError"){
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if(err.name === "ValidationError"){
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources as TErrorSources[];

    }
    else if(err.name === "ZodError"){
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errorSources = simplifiedError.errorSources as TErrorSources[]}

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
            errorSources,
            err : env.NODE_ENV === 'development' ? err : null,
            stack : env.NODE_ENV === 'development' ? err.stack : null

        })
}