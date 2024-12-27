import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js'

const app = new express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);

const port = process.env.port || 4000;

app.listen(port, () => {
    console.log(`Server is listening to port ${process.env.port}`);
})

connectDB();