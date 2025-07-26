import { Types } from "mongoose";

export enum BOOKING_STATUS {
    PENDING = "PENDING",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"

}

export interface IBooking {
    user : Types.ObjectId,
    tour: Types.ObjectId,
    payment : Types.ObjectId,
    guestCount : number,
    status : BOOKING_STATUS
}