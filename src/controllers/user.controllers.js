import asyncHandler from "../utils/asyncHandler.js"
import  ApiError  from '../utils/ApiErrors.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import ApiResponse from "../utils/ApiResponse.js"


// step 5 : access and refresh token 
const genrateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await useInsertionEffect.findById(userId)
        const accesToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()
        
        //database me save karni ka code
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false })
        return {accesToken , refreshToken }

    } catch (error) {
        throw new ApiError(500 ,"something went wrong while genrating refresh and access tokens")

    }
}

const registerUser = asyncHandler ( async (req, res) => {
// get user datail from frontend 
const { fullname , username , email , password } = req.body;
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

const loginUser = asyncHandler(async (req , res)=>{
  // step 1 : req body -> data
  const {username , email , password } = req.body
//step 2 : username or email   
  if(!username || !email){
    throw new ApiError(400 , "Username and email or required");
  }
  //step 3 : find the user 
  const user = await User.findOne({
    $or:[{ username}, {emaill }]
  });
  // agar user exits he nh karta to asy check krengy 
  if(!user){
    throw new ApiError(404 , "User does not exits");
  }

  // step 4 :password check
  const isPassworValid = await user.isPasswordCorrect(password)
  if(!isPassworValid){
    throw new ApiError(401 , "Password is not correct");
  }
   
  //call/used access and refreshtokens
  const { accesToken , refreshToken } = await 
  genrateAccessAndRefreshToken(user._id)
  
  const loggedInUser =  await user.findById(user.id).select("-password - refreshToken")

   
  // step 6 :send cokkie

  const option = {
  
  httpOnly:true,
  secure : true,

  }
  return res
  .status(200)
  .cookie("AccessToken", accesToken , options)
  .cookie("refreshToken",refreshToken , options)
  .json(
    new ApiResponse(
        200 , {
       user: loggedInUser , accesToken , refreshToken
    }, "user loggedIn Successfully"
)
  )

})

export {
    registerUser,
    loginUser
}