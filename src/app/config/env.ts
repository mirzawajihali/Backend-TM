import dotenv from 'dotenv';

dotenv.config()

interface EnvConfig{
  PORT: string,
    MONGO_URI: string ,
    NODE_ENV: 'development' | 'production' ;
    BCRYPT_SALT_ROUNDS : string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string; 
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PASSWORD: string;
    
    FRONTEND_URL: string, EXPRESS_SESSION_SECRET: string, GOOGLE_CALLBACK_URL : string, GOOGLE_CLIENT_SECRET : string, GOOGLE_CLIENT_ID : string

    
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVars : string[] = ['PORT', 'MONGO_URI', 'NODE_ENV', "JWT_ACCESS_SECRET" , "JWT_ACCESS_EXPIRES","JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES","BCRYPT_SALT_ROUNDS", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "FRONTEND_URL", "EXPRESS_SESSION_SECRET", "GOOGLE_CALLBACK_URL", "GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID"];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI  as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,    
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string

  }
}

export const env = loadEnvVariables();