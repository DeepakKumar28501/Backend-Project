//  require('dotenv').config({path: './env'})
//imporoved version
import dotenv from "dotenv";
import connectDB from "./db/index.js";
// when we use dotenv improved version then need to configure that 
dotenv.config({
    path:'./.env'
})
console.log("heelo");
console.log(process.env.MONGODB_URL+" fdgdrtg");
connectDB();





/*
FIRST APPROCH
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
// called iffies that called function immidiatly
// ;(async()=>{})()// here semicolon for cleaning pupose but now not need
const app=express();
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error",(error)=>{// express listener to check why express is not able to ccommunicate with mongodb
            console.log("Not able to connect",error)
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }catch(error){
        console.log("ERROR: ",error);
    }
})()// here semicolon for cleaning pupose
*/