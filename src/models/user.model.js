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
        type : String,
        required : true,
        index : true,
    },
    coverImage :{
        type : String,
        required : true,  //cloudnery 
    },
    password:{
        type : String,
        required : true,
        unique : true,
    },
     refreshToken :{
        type : String,
        required : true,
        unique : true,
    },

})

export const User = mongoose.model("User" , userSchema);