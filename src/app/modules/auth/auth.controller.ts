import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await authServices.credentialsLogin(req.body)
   
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "login Successfully",
        data : loginInfo,
    })
})

export const AuthControllers = {
    credentialsLogin
    
}
