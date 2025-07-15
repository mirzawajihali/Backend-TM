import { env } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";

export const seedSuperAdmin = async () => {
    try{
        const isSuperAdminExists = await User.findOne({  email : env.SUPER_ADMIN_EMAIL});
        if(isSuperAdminExists) {
            console.log("Super Admin already exists");
            return;
        }

        const authProvider : IAuthProvider={
            provider: "credentials",
            providerId: env.SUPER_ADMIN_EMAIL
        }


        const hashedPassword = await bcryptjs.hash(env.SUPER_ADMIN_PASSWORD, Number(process.env.BCRYPT_SALT_ROUNDS));
        const payload : IUser = {
            name : "Super Admin",
            role : Role.SUPER_ADMIN,
            email : env.SUPER_ADMIN_EMAIL,
            isVarified : true,
            auths : [authProvider],
            password : hashedPassword,}


        const superAdmin = await User.create({payload});
        console.log("Super Admin seeded successfully:", superAdmin.email);
    }
    catch (error) {
        console.log("Error seeding Super Admin:", error);
    }
}