import express from "express";
import mongoose from "mongoose";


//DB Connection String
await mongoose.connect(process.env.MONGO_URI)

// use express
const app = express();










// server set up
app.listen (1020,() => {
    console.log ("Live on 1020")
})