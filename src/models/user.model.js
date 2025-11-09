import mongoose, { Schema } from "mongoose"
import  jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        index: true,
    },
    avatar: {
        type: String, //cloudnery
    },
    coverImage: {
        type: String, //cloudnery 
    },
    password: {
        type: String,
        required: [true, "Password is Required"],

    },

    refreshToken: {
        type: String,
        //required : true,
        //unique: true,
        default : null,
    },
    
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },

    ],

}, { timestamps: true });

// ye code keh raha hai k save karny se pehly me password ko encrypt karna chah raha hu
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

//ye code hai k user jo bar password enter karega usko encrypt karega 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// ye code acces token OTP etc
userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },

    )
},

    //ye code refresh OTP token ka hai  
    userSchema.methods.genrateRefreshToken = function () {
        return jwt.sign({ _id: this._id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            },
        )
    }
export const User = mongoose.model("User", userSchema)