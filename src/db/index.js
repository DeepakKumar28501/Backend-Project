import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config({
    path:'../.env'
})


// console.log('heel')
// console.log(process.env.PORT+" port not work")
// console.log(process.env.MONGODB_URL+ " url not found")
const connectDB=async()=>{
    try{
        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB Succcessfully connected... MongoDB HOST: ${connectionInstance.connection.host}`)// to explore
    }catch(error){
        // console.log(`${process.env.DB_NAME}/youtub`)
        console.log("MONGODB connection Failed in db/index",error);
        process.exit(1);// its a mode process failure
    }   
}
export default connectDB;