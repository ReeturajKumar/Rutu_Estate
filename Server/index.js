import express from 'express';
import mongoose from 'mongoose';
import dotenv from'dotenv';


dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to DB');
}).catch((err) => {
  console.log(err);
});


const app = express();

app.listen(808, () => {
  console.log('Server is running on port 8080')
})