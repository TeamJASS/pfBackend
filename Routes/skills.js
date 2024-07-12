import { Router } from "express";
import { allSkills, addSkills, patchSkills, deletedSkills, getSkills } from "../controllers/skills.js";


// Create a Router
const skillsRouter = Router();

// get an Education record
skillsRouter.get('/skills/:id', allSkills);


// Add  all skills record
skillsRouter.post('/skills', addSkills);
// localUpload.single('image'),

//update/ patch 
skillsRouter.patch('/skills/:id', patchSkills);

// Delete
skillsRouter.delete('/skills/:id', deletedSkills);

// a method that will Get a all skills records
skillsRouter.get('/skills', getSkills);



// Export router
export default skillsRouter;