import {Server} from 'http';
import mongoose from 'mongoose';
import app from './app';
import { env } from './app/config/env';



let server : Server;





const startServer = async () => {   

   try{
     await mongoose.connect(env.MONGO_URI)

    console.log('Connected to MongoDB');
    server = app.listen(env.PORT, () => {
        console.log('Server is running on port 3000');
    });
   }catch(error){
    console.log(error);
   }
}


startServer();


process.on('unhandledRejection', () => {
    console.log(' Unhandled Rejection received: closing HTTP server');
    if (server) {
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(1);
        });
    
    }

    process.exit(1);
});

process.on("uncaughtException", () => {
    console.log(' Uncaught Exception received: closing HTTP server');
    if (server) {
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(1);
        });
    
    }

    process.exit(1);
});


process.on('SIGTERM', () => {
    console.log('SIGTERM received: closing HTTP server');
    if (server) {
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    
    }
}); 