import { Router } from "express";
import { allEducation, addEducation, patchEducation, deletedEducation, getEducation } from "../controllers/education.js";


// Create a Router
const educationRouter = Router();

// get an Education record
educationRouter.get('/education/:id', allEducation);


// Add  all Education record
educationRouter.post('/education', localUpload.single('image'), addEducation);

//update/ patch 
educationRouter.patch('/education/:id', patchEducation);

// Delete
educationRouter.delete('/education/:id', deletedEducation);

// a method that will Get a all Education records
educationRouter.get('/education', getEducation);



// Export router
export default educationRouter;