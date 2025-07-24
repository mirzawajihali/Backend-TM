import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.contants";






const createUser = async (payload : Partial<IUser>) =>{

    const { email , password, ...rest } = payload;

    const isUserExist = await User.findOne({email});

    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(process.env.BCRYPT_SALT_ROUNDS));

   
    const authProvider : IAuthProvider = {provider : "credentials", providerId : email as string}

    const user = await User.create({
            email, 
            password : hashedPassword,
            auths : [authProvider],
            ...rest })


            return user

}


const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // Role update authorization
    if (payload.role) {
        // Only SUPER_ADMIN can update roles
        if (decodedToken.role !== Role.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "Only Super Admin can update user roles");
        }

        // Optional: Prevent SUPER_ADMIN from downgrading themselves
        if (decodedToken.user_id === userId && payload.role !== Role.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "Super Admin cannot downgrade their own role");
        }
    }

    // Status update authorization (isActive, isVarified, isDeleted)
    if (payload.isActive !== undefined || payload.isVarified !== undefined || payload.isDeleted !== undefined) {
        // Only ADMIN and SUPER_ADMIN can update user status
        if (decodedToken.role !== Role.ADMIN && decodedToken.role !== Role.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to update user status");
        }
    }

    // Hash password if provided
    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password as string, Number(env.BCRYPT_SALT_ROUNDS));
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });

    return newUpdateUser;
}


const getAllUsers = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(User.find(), query)
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};


export const userServices ={
    createUser,
    getAllUsers,
    updateUser
}