import { Router } from "express";
import { allExperience, addExperience, patchExperience, deletedExperience, getExperience } from "../controllers/experience.js";


// Create a Router
const experienceRouter = Router();

// get an experience record
experienceRouter.get('/experience/:id', allExperience);


// Add  all experience record
experienceRouter.post('/experiences', addExperience);

//update/ patch 
experienceRouter.patch('/experiences/:id', patchExperience);

// Delete
experienceRouter.delete('/experiences/:id', deletedExperience);

// a method that will Get a all experience records
experienceRouter.get('/experiences', getExperience);



// Export router
export default experienceRouter;