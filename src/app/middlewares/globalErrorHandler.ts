import { NextFunction, Request, Response } from "express"
import { env } from "../config/env"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err : any ,req : Request, res : Response, next : NextFunction ) =>{
        res.status(500).json({
            success : false,
            message : `something went wrong: ${err.message}`,
            err,
            stack : env.NODE_ENV === 'development' ? err.stack : null

        })
}