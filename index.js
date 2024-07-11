import express from "express";
import mongoose from "mongoose";
import educationRouter from "./Routes/education.js";
import projectRouter from "./Routes/project.js";

//DB Connection String
await mongoose.connect(process.env.MONGO_URI)

// use express
const app = express();


// Apply middleware
 app.use (express.json());


// use Middleware
app.use(educationRouter);
app.use(projectRouter);


// server set up
app.listen (1020,() => {
    console.log ("Live on 1020")
})