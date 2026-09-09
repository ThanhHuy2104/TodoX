import express from 'express'
import taskRoute from './routes/tasksRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoute);

await connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server bắt đầu trên cổng http://localhost${process.env.PORT}`);
})

