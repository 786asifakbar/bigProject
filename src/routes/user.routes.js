import express from "express";
//import { Router } from "express";
import  { registerUser }  from "../controllers/user.controllers";
import { upload } from "../middlewares/multer.middlewares";

const router = express.Router();

router.route('/register').post(
upload.fields([
       {
        name : "avatar",  //kiya lena chahty ho  
        maxCount : 1, // kitni bar lena chahta ho me 1 bar 
       },
        {
         name : "coverImage",
          maxCount : 1,
       }
]),registerUser);


export  {router};