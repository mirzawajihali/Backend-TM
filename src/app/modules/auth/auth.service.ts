/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import AppError from "../../errorHelpers/AppError";


import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env";


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
   
    
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
    
    return {
            
           
           accessToken : newAccessToken,
    }
}
const resetPassword = async (oldPassword : string, newPassword : string,  decodedToken: JwtPayload) =>{
    

    const user = await User.findOne({email : decodedToken.email});
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string);

    if(!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
    }

     
    user!.password = await bcryptjs.hash(newPassword, Number(env.BCRYPT_SALT_ROUNDS));

    await user!.save();
    
    
    
   
    
}

export  const authServices ={
    credentialsLogin,
    getNewAccessToken,
    resetPassword
}