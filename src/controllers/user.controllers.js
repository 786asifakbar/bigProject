import asyncHandler from "../utils/asyncHandler";

 const registerUser = asyncHandler(async (req , res)=>{

    // get user datail from frontend 
 const {fullname , username , eamil , password} = req.body
 console.log("email" , email); 

});

export  {registerUser};