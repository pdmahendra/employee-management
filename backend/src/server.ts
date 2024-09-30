import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/db';
//import routes
import authRoutes from "./routes/authRoutes"
import employeeRoutes from "./routes/employeeRoutes"

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());


//declare route
app.use('/api/v1/user', authRoutes);
app.use('/api/v1', employeeRoutes);
app.use('/api/v1', express.static('uploads'));



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
