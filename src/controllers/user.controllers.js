import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiErrors.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"
import { jwt } from "jsonwebtoken"



// Genrate Access and Refresh token code start ////////////////////////////////////
// step 5 : access and refresh token 
const genrateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await useInsertionEffect.findById(userId)
    const accessToken = user.genrateAccessToken()
    const refreshToken = user.genrateRefreshToken()

    //database me save karni ka code
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }

  } catch (error) {
    throw new ApiError(500, "something went wrong while genrating refresh and access tokens")
  }
};
  // genrate token code End ////////////////////////////////////



// register form code start ////////////////////////////////////
const registerUser = asyncHandler(async (req, res) => {
  // get user datail from frontend 
  const { fullname, username, email, password } = req.body;
  // validation -not empty 
  if ([
    fullname,username,email,password
  ].some((filed) =>
    filed?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required")
  }
  // check if user already exists:username,email
  const userExist = await User.findOne({
    $or: [{ username },{ email }]
  });
  if (userExist) {
    throw new ApiError(409, "User with username and email are already exits")
  }
  // check for images check for avatar 
  const avatarPath = req.files?.avatar[0]?.path;
  //const coverImagePath = req.files?.coverImage[0]?.path;
  
  // ye wala code bhi hai par advance hai 
  let coverImagePath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImagePath = req.files.coverImage[0]?.path;
  }
  if (!avatarPath) {
    throw new ApiError(400, "Avatar is required");
  }

  //upload them to cloudinery , avatar
  const avatar = await uploadOnCloudinary(avatarPath)
  const coverImage = await uploadOnCloudinary(coverImagePath)
  if (!avatar) {
    throw new ApiError(400, "avatar are required");
  }
  //create user object -create entry in db
  const user = User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })
  const createdUser = await findById(user._id).select(
    "-password -refreshToken"
  )
  //check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong")
  };
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Successfully")
  )
});
// register form code end ////////////////////////////////////


// logged In form code start /////////////////////////////////
const loginUser = asyncHandler(async (req, res) => {
  // step 1 : req body -> data
  const { username, email, password } = req.body
  //step 2 : username or email   
  if (!username && !email) {
    throw new ApiError(400, "Username and email or required");
  }
  //step 3 : find the user 
  const user = await User.findOne({
    $or: [{ username }, { email }]
  });

  // agar user exits he nh karta to asy check krengy 
  if (!user) {
    throw new ApiError(404, "User does not exits");
  }

  // step 4 :password check
  const isPassworValid = await user.isPasswordCorrect(password)
  if (!isPassworValid) {
    throw new ApiError(401, "Password is not correct");
  }

  //call/used access and refreshtokens
  const { accessToken, refreshToken } = await
    genrateAccessAndRefreshToken(user._id)

  const loggedInUser = await user.findById(user.id)
  .select("-password - refreshToken");

  // step 6 :send cokkie
  const options = {
    httpOnly: true,
    secure: true,
  }
  return res
    .status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200, {
        user: loggedInUser, accessToken, refreshToken
      }, 
         "user loggedIn Successfully"
      )
    )
});
// loggedIn form code End ////////////////////////////////////


// logout form code start ////////////////////////////////////
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  }
  return res
    .status(200)
    .ClearCookie("accessToken", options)
    .ClearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
});
// loggedOut form code end ////////////////////////////////////


// refreshAccessToken form code start ////////////////////////////////////
const refreshAccessToken = asyncHandler(async (req ,res) => {

const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

if(!incomingRefreshToken){
  throw new ApiError(401 , "unauthorized Request");
}
try {
    const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  )
  const user = await User.findById(decodedToken?._id)
  if(!user){
    throw new ApiError(401 , "Invalid Refresh Token");
  }
  if(incomingRefreshToken !== user?.refreshToken){
    throw new ApiError(401 , "Refresh Token is Expired")
  }
  const options ={
    httpOnly : true,
    secure : true,
  }
    const {accessToken , newrefreshToken } = await genrateAccessAndRefreshToken(user?._id)
    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , newrefreshToken , options)
    .json(
      new ApiResponse(
        200,
       {accessToken , refreshToken: newrefreshToken},
       "Access Token Refreshed"
      )
    )
  
} catch (error) {
  throw new ApiError(401 , error?.massage || "Invalid Refresh Token")

}



});
// refreshAccessToken form code end ////////////////////////////////////

const changeCurrentPassword = asyncHandler(async (req , res)=>{
const {oldPassword , newPassword} = req.body

const user = await User.findById(req.user?.id)
const isPasswordCorrect = await user.isPasswordCorrect(oldPassword); 

if(!isPasswordCorrect){
  throw new ApiError(401 , "Invalid old Password")
}

user.password = newPassword
await user.save({validateBeforeSave :  false })

return res
.status(200)
.json(
   new ApiResponse(200 , {} , "Password Changed successfully")
   )



});


const getCurrentUser = asyncHandler(async(req , res)=>{
return res
.status(200)
.json(200 , req.user, "current User fatched successfully")

});


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
}