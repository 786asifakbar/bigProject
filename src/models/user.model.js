import mongoose , {schema}  from 'mongoose';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    },   
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname :{
        type : String,
        required : true,
        index : true,
    },
    avatar :{
        type : String, //cloudnery
    },
    coverImage :{
        type : String, //cloudnery 
    },
    password:{
        type : String,
        required : [true , "Password is Required"],
        
    },

     refreshToken :{
        type : String,
        required : true,
        unique : true,
    },
    watchHistory : [
         {
            type : Schema.Types.ObjectId,
            ref : "Video"
         },

    ],

},{timestamps : true});


export const User = mongoose.model("User" , userSchema);