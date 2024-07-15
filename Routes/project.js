import { Router } from "express";
import {  getProject, postproject, patchProject, getProjects, deletedProject } from "../controllers/project.js";


// Create a Router
const projectRouter = Router();

// get a project router
projectRouter.get('/projects', getProject);

// Add Project
projectRouter.post('/projects', postproject);
// ', localUpload.single('image')

//update patch 
projectRouter.patch('/projects/:id', patchProject);

// Delete
projectRouter.delete('/projects/:id', deletedProject);

// a method that will Get a single Project
projectRouter.get('/projects/:id', getProjects);


// Export router
export default projectRouter;