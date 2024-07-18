import { Router } from "express";
import { allSkills, getSkills, addSkills, patchSkills, deletedSkills } from "../controllers/skills.js";
import { checkUserSession } from "../middleware/auth.js";

// Create a Router
const skillsRouter = Router();

// get an Education record
skillsRouter.get('/users/skills', checkUserSession, allSkills);


// Add  a skills record
skillsRouter.post('/users/skills',checkUserSession, addSkills);
// localUpload.single('image'),

//update/ patch 
skillsRouter.patch('/users/skills/:id', checkUserSession, patchSkills);

// Delete
skillsRouter.delete('/users/skills/:id', checkUserSession, deletedSkills);

// a method that will Get a skill record by ID
skillsRouter.get('/users/skills/:id',checkUserSession, getSkills);



// Export router
export default skillsRouter;