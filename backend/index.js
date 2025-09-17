import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

const app=express(); //all the methods in the express can be used from the app
const port=process.env.PORT || 5000;

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.get("/",async (req,res)=>{
    let prompt=req.query.prompt;
    let data=await geminiResponse(prompt);
    res.json(data);
})

//Routing
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.listen(port,()=>{
    connectDb();
    console.log("Server Started!!!");
});