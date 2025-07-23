// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status-codes";

// import { catchAsync } from "../../utils/catchAsync";
// import { sendResponse } from "../../utils/sendResponse";
// // import { verifyToken } from "../../utils/jwt";
// // import { env } from "../../config/env";




// const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const user = await userServices.createUser(req.body)

    

//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "User Created Successfully",
//         data : user,
//     })
// })