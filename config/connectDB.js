import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
if (!process.env.MONGO_URL)
    throw new Error(" Mongo url is not defined")
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to mongodb")
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDB