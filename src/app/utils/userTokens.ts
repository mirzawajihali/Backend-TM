import { env } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
    
    const jwtPayload = { email: user.email, user_id: user._id , role : user.role }

  
    const accessToken = generateToken(jwtPayload, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES);

    const refreshToken = generateToken(jwtPayload, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES);
    

    return {
        accessToken, refreshToken
    }

}