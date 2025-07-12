
import express, {  Request, Response } from 'express';
import cors from 'cors';

import { router } from './app/routes';

import { globalErrorHandler } from './app/middlewares/globalErrorHandler';



const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router)

app.get('/', (req : Request, res : Response) => {
    res.send('Hello World');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)

export default app;