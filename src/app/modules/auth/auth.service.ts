import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import AppError from "../../errorHelpers/AppError";
import jwt from "jsonwebtoken";


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

    const jwtPayload = { email: isUserExist.email, user_id: isUserExist._id , role : isUserExist.role }

    const accessToken = jwt.sign(
        jwtPayload,
        "secret",
        { expiresIn: "1d" }
    );
    

    return {
            
            accessToken
    }
}

export  const authServices ={
    credentialsLogin
}