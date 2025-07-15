import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}




//auth providers
// email, Pass
// google auth





export interface IAuthProvider {
    provider : "google" | "credentials";
    providerId : string;
}


export interface IUser {
    _id ?: Types.ObjectId;
    name : string;
    email : string;
    password ?: string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDeleted ?: boolean;
    isActive ?: isActive;
    isVarified ?: boolean;
    auths : IAuthProvider[];
    role : Role;
    bookings ?: Types.ObjectId[];
    guides ?: Types.ObjectId[];

}