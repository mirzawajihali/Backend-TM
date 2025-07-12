   import {Server} from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';



const app = express();

app.get('/', (req : Request, res : Response) => {
    res.send('Hello World');
});

export default app;