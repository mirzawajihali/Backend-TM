import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from 'http-status-codes';
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";


const getTransactionId  = () =>{
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}


const createBooking = async (payload  : Partial<IBooking>, userId : string) => {
    
    const user = await User.findById(userId);

    const transactionId = getTransactionId();
    
    if (!user?.phone || !user?.address) {
        throw new AppError(httpStatus.BAD_REQUEST, "Please update your phone and address before booking a tour");}

        const tour = await Tour.findById(payload.tour).select("costFrom");

        if(!tour?.costFrom){
            throw new AppError(httpStatus.BAD_REQUEST, "Tour not found or cost is not defined");
        }

        const amount =  Number(tour.costFrom )* Number(payload.guestCount);

        const booking = await Booking.create({
            user : userId,
            status : BOOKING_STATUS.PENDING,

            ...payload
        })


        const payment = await Payment.create({ booking : booking._id, transactionId: transactionId, status :PAYMENT_STATUS.UNPAID, amount : amount}  )


        const updatedBooking  = await Booking.findByIdAndUpdate(booking._id, {
            payment : payment._id,
        },
    {
        new : true, runValidators: true
    })
    .populate("user", "name email phone")
    .populate("tour", "title slug costFrom")
    .populate("payment");

    return updatedBooking

}

export const BookingService = {
    createBooking
}