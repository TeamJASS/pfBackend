import { Router } from "express";
import { addEducation, patchEducation, deletedEducation, getEducation, getEducationList  } from "../controllers/education.js";
import { checkUserSession } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/uploads.js";


// Create a Router
const educationRouter = Router();


// Add  an Education record
educationRouter.post('/users/education',remoteUpload.single('image'), checkUserSession, addEducation);

//update/ patch 
educationRouter.patch('/users/education/:id',checkUserSession, patchEducation);

// Delete
educationRouter.delete('/users/education/:id', checkUserSession, deletedEducation);

// a method that will Get a all Education records
educationRouter.get('/users/education',checkUserSession, getEducationList);

// a method that will Get an achievement by id
educationRouter.get('/users/education/:id', getEducation);


// Export router
export default educationRouter;