require('dotenv').config({path:'./env'});
//import dotenv from "dotenv"
import connectDb from './db/dbConnection.js'
// dotenv.config({
//     path : "./env"
// })

 

connectDb();




/*


//ak Treqa ye hai database likhny ka 
import mongoose from 'mongoose';
import { DB_NAME } from './constants';
import express from 'express';
const app = express();

(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       // ye app.on code lagany ka mqsad hai k kiya express database se connect hai use bat kar sakty hai   
       app.on("error",(error)=>{
            console.log("error" , error);
            throw error
         })
         app.listen(process.env.PORT , ()=>{
        console.log(`Port is listening ${process.env.PORT}`)
         })
    }catch(error){
        console.error("error",error);
        throw error
        }
})()
        */