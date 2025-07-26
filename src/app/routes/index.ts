import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivisionRoutes } from "../modules/division/division.route";
import { TourRoutes } from "../modules/tour/tour.route";

export const router = Router();


const moduleRoutes =[
    {
        path: '/user',
        route: userRoutes
    },
    {
        path :"/auth",
        route : AuthRoutes
    },
    {
        path : "/division",
        route : DivisionRoutes
    },
    {
        path : "/tour",
        route : TourRoutes
    },
    {
        path : "/booking",
        route : bookingRoutes
    }
   
]


moduleRoutes.forEach(route => router.use(route.path, route.route));