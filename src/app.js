import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser"
const app=express();
// cors setting 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
//accept json data like form data
app.use(express.json({limit:"16kb"}))

// here we configure url data
app.use(express.urlencoded({extended:true,limit:"16kb"}))

// below code handle or store document files public is folder name
app.use(express.static("public"))
//handle cookies
app.use(cookieparser())



///routers
import userRouter from "./routes/user.routes.js";

//routes declaration
console.log("in app.js")
app.use("/api/v1/users",userRouter);// here we use middleware
//api/v1 indicate version of api
// http://localhost:8000/user/register like this url is made

export{ app };