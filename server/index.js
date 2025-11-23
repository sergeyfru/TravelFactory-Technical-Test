import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { vacationRouter } from './routes/vacation_route.js';
import { userRouter } from './routes/user_route.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: [ 'http://localhost:5173' ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/check', (req, res) => {
  res.send('Hello from the backend server!!!');
});

app.use('/api', vacationRouter);
app.use('/registration', userRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3001}`);
});