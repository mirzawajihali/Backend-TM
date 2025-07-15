import { NextFunction, Request, Response } from "express";
import  { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { env } from "../config/env";



export const checkAuth  = (...authRoles : string[]) => async (req: Request, res: Response, next: NextFunction) =>{
   try{
     const accessToken = req.headers.authorization;
    if(!accessToken) {
        throw new AppError(403, "No token received")
    }

    const verifiedToken= verifyToken(accessToken, env.JWT_ACCESS_SECRET) as JwtPayload

   
    if(!authRoles.includes(verifiedToken.role))  {
        throw new AppError(403, "You are not authorized to access this resource");
    }

    req.user = verifiedToken
    
    next();
   }
   catch(error) {
    next(error);
   }
}
