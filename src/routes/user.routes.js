import express from "express";
import  { loginUser, logoutUser, registerUser }  from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

       router.route("/register").post(upload.fields([{
       name : "avatar",  //kiya lena chahty ho  
       maxCount : 1, // kitni bar lena chahta ho me 1 bar 
       },
        {
         name : "coverImage",
          maxCount : 1,
         },
]),registerUser)

router.route("/login").post(loginUser)

//secure routes
router.route('/logout').post(varifyJWT , logoutUser)

export default router