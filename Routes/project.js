import { Router } from "express";
import { getProjects, getProject, postproject, patchProject, deletedProject } from "../controllers/project.js";


// Create a Router
const projectRouter = Router();

// get a project router
projectRouter.get('/users/projects', getProjects);

// Add Project
projectRouter.post('/users/projects', postproject);
// ', localUpload.single('image')

//update patch 
projectRouter.patch('/users/projects/:id', patchProject);

// Delete
projectRouter.delete('/users/projects/:id', deletedProject);

// a method that will Get a single Project
projectRouter.get('/users/project/:id', getProject);


// Export router
export default projectRouter;