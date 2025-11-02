import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
//cors k ase define kiya jata hai app.use k sath
app.use(cors({
origin : process.env.CORS_ORIGIN, //.env me bhi likhna hai CORS_ORIGIN
credentials : true // tak allow ho 
}))

// ye major 3 part hen configuration k , k matlb agr data aae to in formats me aae 
app.use(express.json({limit: "16kb"})) // json me data aaengi
app.use(express.urlencoded({extended: true , limit : "16kb"})) // url me data aati hai encoded hoti hai uska setup karny k liye 
app.use(express.static("public")) // iska matlb jo bhi images vidoes aae wo public k folder me chala jae data  
app.use(cookieParser());


// import routs
import router from './routes/user.routes.js';

//routes declerstion
app.use('/api/v1/users',router);



//http://localhost:8000/api/v1/users/register

export { app };