import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// cloudinary configuration

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

const uploadOnCloudinary=async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
        //upload the file on cloudinary
       const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file hase been uploaded successfully
        console.log("file is upload on cloudinary"+response.url)
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath)// remve the locally saved temporary file as the upload operation got failed
        return null;
    }
}
export {uploadOnCloudinary};