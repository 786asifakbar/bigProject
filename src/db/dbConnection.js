//import dotenv from "dotenv";
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";
//dotenv.config({path : "./.env"});

const connectDb = async ()=>{
    try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}
        /${DB_NAME}`)
        console.log(`MongoDB connected succesfully !! DB Host
             ${connectionInstance.connection.host}`)
    }catch(error){
        console.log(`mongoDB connection Error  ${error}`);
        process.exit(1);
    }
}
export default connectDb ;