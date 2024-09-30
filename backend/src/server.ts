import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/db';
import path from 'path';
//import routes
import authRoutes from "./routes/authRoutes"
import employeeRoutes from "./routes/employeeRoutes"

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//declare route
app.use('/api/v1', authRoutes);
app.use('/api/v1', employeeRoutes);




const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    });
