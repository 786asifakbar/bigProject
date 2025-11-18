import express from "express"
import connectDb from "./db/dbConnection.js"
import app from "./app.js";

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("server connection failed", error);
})