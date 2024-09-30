// src/db.ts

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("Database connected:", connect.connection.host);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
