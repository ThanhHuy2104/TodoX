import express from 'express'
import taskRoute from './routes/tasksRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(cors({origin: 'http://localhost:5173'}));
}


app.use("/api/tasks", taskRoute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
}

await connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server bắt đầu trên cổng http://localhost:${process.env.PORT}`);
})

