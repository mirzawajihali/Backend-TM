/* eslint-disable @typescript-eslint/no-unused-vars */
import { isActive, IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import AppError from "../../errorHelpers/AppError";

import { generateToken, verifyToken } from "../../utils/jwt";
import { env } from "../../config/env";
import { createUserTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";


const credentialsLogin = async (payload : Partial<IUser>) =>{

    const {email, password} = payload;

    const isUserExist = await User.findOne({email});
    
    // Fix: Check if user DOESN'T exist (opposite logic)
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPassWordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);
    

    if(!isPassWordMatched){
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }

   

    const userTokens = createUserTokens(isUserExist)
    
    const  {password : pass  , ...rest} = isUserExist.toObject();

    return {
            
            accessToken : userTokens.accessToken,
            refreshToken : userTokens.refreshToken,
            user : rest
    }
}
const getNewAccessToken = async (refreshToken : string) =>{
    const verifiedRefreshToken = verifyToken(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
    

    const isUserExist = await User.findOne({email : verifiedRefreshToken.email});
    
    // Fix: Check if user DOESN'T exist (opposite logic)
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    if(isUserExist.isActive === isActive.BLOCKED){
        throw new AppError(httpStatus.NOT_FOUND, "User is blocked");
    }
    if(isUserExist.isDeleted){
        throw new AppError(httpStatus.NOT_FOUND, "User is deleted");
    }

   
        const jwtPayload ={
            userId : isUserExist._id,
            email : isUserExist.email,
            role : isUserExist.role

        }

        const accessToken = generateToken(jwtPayload, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES);
   

    
    
    
    return {
            
           
           accessToken
    }
}

export  const authServices ={
    credentialsLogin,
    getNewAccessToken
}