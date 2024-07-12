import { Router } from "express";
import { allExperience, addExperience, patchExperience, deletedExperience, getExperience } from "../controllers/experience.js";


// Create a Router
const experienceRouter = Router();

// get an experience record
experienceRouter.get('/experience/:id', allExperience);


// Add  all experience record
experienceRouter.post('/experience', addExperience);

//update/ patch 
experienceRouter.patch('/experience/:id', patchExperience);

// Delete
experienceRouter.delete('/experience/:id', deletedExperience);

// a method that will Get a all experience records
experienceRouter.get('/experience', getExperience);



// Export router
export default experienceRouter;