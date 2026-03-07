import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
connectDB();

const app=express();
app.use(express.json());
app.use('/api/user',userRoutes);
const port=process.env.PORT || 5000;
app.listen(port,()=> console.log("server is running on port 5000"));