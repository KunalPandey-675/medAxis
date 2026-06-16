import mongoose from "mongoose";

export const connectDB= async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL as string)
        console.log(`MongoDb connected: ${conn.connection.host} `)
    } catch (error) {
        console.error(`error in connecting : ${(error as Error).message}`)
        process.exit(1)
    }
}