import { Router } from "express";
import { allSkills, addSkills, patchSkills, deletedSkills, getSkills } from "../controllers/skills.js";
import { checkUserSession } from "../middleware/auth.js";

// Create a Router
const skillsRouter = Router();

// get an Education record
skillsRouter.get('/skills/:id', checkUserSession, allSkills);


// Add  all skills record
skillsRouter.post('/skills', checkUserSession, addSkills);
// localUpload.single('image'),

//update/ patch 
skillsRouter.patch('/skills/:id', checkUserSession, patchSkills);

// Delete
skillsRouter.delete('/skills/:id', checkUserSession, deletedSkills);

// a method that will Get a all skills records
skillsRouter.get('/skills', checkUserSession, getSkills);



// Export router
export default skillsRouter;