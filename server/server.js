import express from 'express';
import 'dotenv/config';
import connectDB from './config/dbconfig.js'
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import { auth } from './middleware/auth.js';
import habitRouter from './routes/habitRouter.js';
import aiRouter from './routes/aiRouter.js';
const app = express()

const PORT = process.env.PORT || 4000;
await connectDB;
app.use(express.json());
app.use(cors());
app.use('/api/user',userRouter);
app.use('/api/habit',auth,habitRouter);
app.use('/api/coach',auth,aiRouter);
app.get('/',(req,res)=>{
    res.send("API is working 🫂");
})

app.listen(PORT,()=>{
    console.log(`Server running in ${PORT}`)
})