import { Router } from "express";
import { getProjects, postproject, patchProject, deletedProject } from "../controllers/project.js";


// Create a Router
const projectRouter = Router();

// get a project router
projectRouter.get('/users/project', getProjects);

// Add Project
projectRouter.post('/users/project', postproject);
// ', localUpload.single('image')

//update patch 
projectRouter.patch('/users/project/:id', patchProject);

// Delete
projectRouter.delete('/users/project/:id', deletedProject);

// a method that will Get a single Project
// projectRouter.get('/users/project/:id', getProjects);


// Export router
export default projectRouter;