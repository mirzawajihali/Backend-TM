import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await authServices.credentialsLogin(req.body)
   
    res.cookie('refreshToken', loginInfo.refreshToken, {
        httpOnly: true,
       
        secure : false,
    })
    
    res.cookie('accessToken', loginInfo.accessToken, {
        httpOnly: true,
       
        secure : false,
    })
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "login Successfully",
        data : loginInfo,
    })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
     if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "Refresh token not found");
    }
    const tokenInfo = await authServices.getNewAccessToken(refreshToken as string)
   
   
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "login Successfully",
        data : tokenInfo,
    })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
    
}
