import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
// import { verifyToken } from "../../utils/jwt";
// import { env } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)

    

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data : user,
    })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, env.JWT_ACCESS_SECRET) as JwtPayload;
    const verifiedToken = req.user as JwtPayload;
    const payload = req.body;
    const user = await userServices.updateUser(userId, payload, verifiedToken )

    

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data : user,
    })
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await userServices.getAllUsers(query as Record<string, string>);

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})
// function => try-catch catch => req-res function

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
    
}
