import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from '@mickeymond/express-oas-generator'
import session from "express-session"
import MongoStore from "connect-mongo";
import userRouter from "./Routes/user.js";
import educationRouter from "./Routes/education.js";
import projectRouter from "./Routes/project.js";
import achievementsRouter from "./Routes/achievements.js";
import experienceRouter from "./Routes/experience.js";
import skillsRouter from "./Routes/skills.js";
import { volunteeringRouter } from "./Routes/volunteering.js";


//DB Connection String
await mongoose.connect(process.env.MONGO_URL)
console.log("Database is connected")

// use express
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','userProfile', 'skills', 'projects', 'volunteering', 'experiences', 'education', 'achievements'],
    mongooseModels: mongoose.modelNames()
    
    
})

// use middleware

app.use(cors({credentials:true ,origin:"http://localhost:5173"}));
app.use(express.json());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL
    })

}))


app.use("/api/v1", userRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", experienceRouter);
app.use("/api/v1", achievementsRouter);
app.use("/api/v1", skillsRouter);
app.use("/api/v1", volunteeringRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


// server set up
app.listen (1020,() => {
    console.log ("Live on 1020")
});