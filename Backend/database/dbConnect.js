import mongoose from "mongoose";

export const dbConnection=async()=>{
await mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to db");
})
.catch(()=>{
    console.log("Some error occured");
})
}