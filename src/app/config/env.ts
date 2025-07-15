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
    
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVars : string[] = ['PORT', 'MONGO_URI', 'NODE_ENV', "JWT_ACCESS_SECRET" , "JWT_ACCESS_EXPIRES","JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES","BCRYPT_SALT_ROUNDS", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD"];
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
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string

  }
}

export const env = loadEnvVariables();