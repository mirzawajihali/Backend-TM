
import express, {  Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import "./app/config/passport";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
// Removed express-session and passport.session() since we're using session: false
app.use(cors());

app.use('/api/v1', router)

app.get('/', (req : Request, res : Response) => {
    res.send('Hello World');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)

app.use(notFound)

export default app;