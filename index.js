import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user_routes.js";

//DB Connection String
await mongoose.connect(process.env.MONGO_URI)
console.log("Database is connected")

// use express
const app = express();

// use middleware
app.use(express.json());

app.use("/api/v1",userRouter)









// server set up
app.listen (1020,() => {
    console.log ("Live on 1020")
})