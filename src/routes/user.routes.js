import express from "express";
import {loginUser, logoutUser, registerUser , refreshAccessToken } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


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

router.route('/logout').post(verifyJWT , logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


export default router