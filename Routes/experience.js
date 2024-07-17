import { Router } from "express";
import { allExperience, addExperience, patchExperience, deletedExperience, getExperience } from "../controllers/experience.js";
import { checkUserSession } from "../middleware/auth.js";
import { userProfileSchema } from "../schemas/schema.js";

// Create a Router
const experienceRouter = Router();

// get an experience record
experienceRouter.get('/users/experiences/:id', checkUserSession, allExperience);


// Add  all experience record
experienceRouter.post('/users/experiences', checkUserSession, addExperience);

//update/ patch 
experienceRouter.patch('/users/experiences/:id', checkUserSession, patchExperience);

// Delete
experienceRouter.delete('/users/experiences/:id', checkUserSession, deletedExperience);

// a method that will Get a all experience records
experienceRouter.get('/users/experiences', checkUserSession, getExperience);



// Export router
export default experienceRouter;