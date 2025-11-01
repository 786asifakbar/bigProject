import { v2 as cloudinary } from 'cloudinary';
import fs, { unlinkSync } from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:CLOUDINARY_API_SECRET,
    
    });

    const uploadOnCloudinary = async (localFilePath) =>{
        try{
          if(!localFilePath) return null
          //upload file on clodinary
          const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
           })
           //file has been uploaded successfully 
           console.log("file has uploaded on cloudinary" , response.url)
            return response
          }catch(error){
           fs.unlinkSync(localFilePath) // file remove the locally save temprary file
           return null 
        }
     }
    