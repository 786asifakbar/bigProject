import mongoose , {schema}  from 'mongoose';

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
        required : [true , "Password Required"],
        
    },

     refreshToken :{
        type : String,
        required : true,
        unique : true,
    },
    watchHistory : [
         {
            type : Schema.Types.ObjectId,
            ref : "video"
         },

    ],

},{timestamps : true});


export const User = mongoose.model("User" , userSchema);