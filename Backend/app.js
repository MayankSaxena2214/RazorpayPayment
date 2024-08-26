import express from "express"
import dotenv from "dotenv"
import paymentRouter from "./routers/paymentRouter.js"
import cors from "cors";
dotenv.config({path:"./config/config.env"})

export const app=express();


// Set up CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    credentials: true // Allow credentials (e.g., cookies)
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",paymentRouter);

app.get("/api/getkey",(req,res,next)=>{
    res.status(200).json({
        success:true,
        key:process.env.RAZORPAY_KEYID
    })
})
