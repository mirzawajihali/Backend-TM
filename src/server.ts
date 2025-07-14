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
        console.log(`Server is running on port ${env.PORT}`);
    });
   }catch(error){
    console.log(error);
   }
}


startServer();


process.on('unhandledRejection', (err: unknown) => {
    console.log('Unhandled Rejection received:', err);
    console.log('Closing HTTP server');
    if (server) {
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

process.on("uncaughtException", (err: unknown) => {
    console.log('Uncaught Exception received:', err);
    console.log('Closing HTTP server');
    if (server) {
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
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