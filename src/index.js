//require('dotenv').config();
import dotenv from "dotenv"
import connectDb from "./db/dbConnection.js"
 dotenv.config({   
    path : "./.env"
 
})

 

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("server connection failed", error);
})