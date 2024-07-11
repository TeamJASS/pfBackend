import express from "express";
import mongoose from "mongoose";
import educationRouter from "./Routes/education.js";
import projectRouter from "./Routes/project.js";
import userRouter from "./Routes/user_routes.js";

//DB Connection String
await mongoose.connect(process.env.MONGO_URI)
console.log("Database is connected")

// use express
const app = express();

// use middleware
app.use(express.json());

app.use("/api/v1",userRouter)

// Apply middleware
 app.use (express.json());


// use Middleware
app.use(educationRouter);
app.use(projectRouter);


// server set up
app.listen (1020,() => {
    console.log ("Live on 1020")
})