import { Types } from "mongoose";

export enum PAYMENT_STATUS {
    PAID = "PAID",
    UNPAID = "UNPAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    CANCELLED = "CANCELLED"
}
export interface IPayment {
    user : Types.ObjectId,
    booking : Types.ObjectId,
    transactionId: string,
    amount: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paymentGatewayData? : any,
    invoiceURL ?: string,
    status : PAYMENT_STATUS
}
