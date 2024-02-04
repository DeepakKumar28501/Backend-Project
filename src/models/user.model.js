import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        unique:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
    },
    coverImage:{
        type:String//cloudinary url
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    refreshToken:{
        type:String
    }
},
{timestamps:true});

//here we use hook for encrypt data
// here we use async because pre is a middleware that takes some time to process it 
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)// number is a round for encrypt
    next()
   
    
})
 //create custome middleware
    //check password is correct formate
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
// we can create middleware custom function that are comes under Schema 

userSchema.methods.generateAccessToken=function(){
    // in sign method have a payload that comes from database 
   return jwt.sign({
        _id:this._id,//from database
        emial:this.email,//from database
        username:this.username,//from database
        fullname:this.fullname//from database
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id//from database
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}
export const User=mongoose.model("User",userSchema);

