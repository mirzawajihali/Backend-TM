import { Router } from "express";
import { UserControllers } from "./user.controller";

import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

import { checkAuth } from "../../middlewares/checkAuth";




const router = Router();



router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);

router.get("/all-users",checkAuth("ADMIN", "SUPER_ADMIN"),  UserControllers.getAllUsers);

export const userRoutes = router;