/* eslint-disable @typescript-eslint/no-unused-expressions */
import passport from "passport";
import { Strategy as googleStrategy, Profile, VerifyCallback} from "passport-google-oauth20";
import { env } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";

passport.use(
    new googleStrategy({
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: env.GOOGLE_CALLBACK_URL as string,
        passReqToCallback: true
    }, async(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req: any,
        accessToken: string,
        refreshToken: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params: any,
        profile: Profile,
        done: VerifyCallback
    ) => {
        try {

            const email = profile.emails?.[0]?.value;
            if (!email) {
                return done(null, false, { message: "No email found in Google profile" });
            }

            let user = await User.findOne({email});
            if(!user){
                user = await User.create({
                    email,
                    name: profile.displayName ,
                    picture : profile.photos?.[0]?.value,
                    role : Role.USER,
                    isVarified: true,
                    auths :[
                        {
                            provider : "google",
                            providerId : profile.id
                        }
                    ]
            })

            
        }
        return done(null, user);
    }

        catch (error) {
            console.log("Error in Google Strategy:", error);
            return done(error);
        }
        
    }
))

// Since we're using session: false, we don't need serialize/deserialize
// Remove or comment out the following:

// passport.serializeUser((user : any, done : (err : any, id ?: unknown) => void) => {
//     done(null, user._id);
// });

// passport.deserializeUser(async (id : string, done :  any) => {
//     try{
//         const user = await User.findById(id);
//         done(null, user);
//     }
//     catch(error){
//         done(error);
//     }
// })