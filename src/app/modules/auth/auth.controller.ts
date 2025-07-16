import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await authServices.credentialsLogin(req.body)
   
    // res.cookie('refreshToken', loginInfo.refreshToken, {
    //     httpOnly: true,
       
    //     secure : false,
    // })
    
    // res.cookie('accessToken', loginInfo.accessToken, {
    //     httpOnly: true,
       
    //     secure : false,
    // })

    setAuthCookie(res, loginInfo)
    
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
    const tokenInfo = await authServices.getNewAccessToken(refreshToken as string);

    //    res.cookie('accessToken', tokenInfo.accessToken, {
    //     httpOnly: true,
       
    //     secure : false,
    // })
   setAuthCookie(res, tokenInfo);
   
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "New access token retrived Successfully",
        data : tokenInfo,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    res.clearCookie('refreshToken', {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    });
    
    res.clearCookie('accessToken', {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    });
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Log out Successfully",
        data : null,
    })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPassword =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
   

    const newPassword = req.body.newPassword;

    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;


     await authServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);
   
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "password changed succesfully Successfully",
        data : null,
    })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword
    
}
