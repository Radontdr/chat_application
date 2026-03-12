import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import cors from 'cors';
import { errorHandler,notFound } from './middlewares/errorhandler.js';

dotenv.config();
connectDB();

const app=express();
app.use(cors());

app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(errorHandler);

const port=process.env.PORT || 5000;
app.listen(port,()=> console.log("server is running on port 5000"));