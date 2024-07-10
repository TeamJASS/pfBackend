import { Router } from "express";
import {  getProject, patchProject, postproject, getProjects, deletedProject } from "../controllers/project.js";


// Create a Router
const projectRouter = Router();

// get a project router
projectRouter.get('/project', getProject);

// Add Project
projectRouter.post('/project', localUpload.single('image'), postproject);

//update patch 
projectRouter.patch('/project/:id', patchProject);

// Delete
projectRouter.delete('/project/:id', deletedProject);

// a method that will Get a single Project
projectRouter.get('/project/:id', getProjects);


// Export router
export default projectRouter;