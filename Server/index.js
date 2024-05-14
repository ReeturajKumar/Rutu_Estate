import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/userRoute.js';
import authRouter from './Routes/authRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to DB')})
  .catch((err) => {
    console.log(err)});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(8080, () => {
  console.log('Server is running on port 8080')});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success : false,
    statusCode,
    message,
  });
});
