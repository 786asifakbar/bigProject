import AsyncHandler from "../utils/AsyncHandler.js"
import  ApiError  from '../utils/ApiErrors.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import ApiResponse from "../utils/ApiResponse.js"

const registerUser = AsyncHandler ( async (req, res) => {
// get user datail from frontend 
const { fullname , username , email , password } = req.body
    // validation -not empty 
    if([ 
        fullname, 
        username, 
        email, 
        password
        ].some((filed) =>
            filed?.trim() === "")
    ) {
        throw new ApiError(400 , "All field are required")
    }
    // check if user already exists:username,email
    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (userExist) {
        throw new ApiError(409 ,"User with username and email are already exits")
    }
// check for images check for avatar 
   const avatarPath = req.files?.avatar[0]?.path;
   //const coverImagePath = req.files?.coverImage[0]?.path;
     // ye wala code bhi hai par advance hai 
     let coverImagePath;
     if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImagePath = req.files.coverImage[0]?.path;
     }
   if(!avatarPath){
    throw new ApiError(400 , "Avatar is required");
   }

//upload them to cloudinery , avatar
const avatar = await uploadOnCloudinary(avatarPath)
const coverImage = await uploadOnCloudinary(coverImagePath)
if(!avatar){
    throw new ApiError(400, "avatar are required");
}
//create user object -create entry in db
const user = User.create({
    fullname,
    avatar: avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
})
  const createdUser = await findById(user._id).select(
    "-password -refreshToken"
  )
  //check for user creation
if(!createdUser){
    throw new ApiError(500 , "Something went wrong")
};
return res.status(201).json(
    new ApiResponse(200 , createdUser, "User Registered Successfully")
)
});
export {registerUser}