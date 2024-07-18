import { Router } from "express";
import { allAchievements, addAchievements, patchAchievements, deletedAchievements } from "../controllers/achievements.js";
import { remoteUpload } from "../middleware/uploads.js";

// Create a Router
const achievementsRouter = Router();

// get an achievements record
achievementsRouter.get('/users/achievements', allAchievements);


// Add  all achievements record
achievementsRouter.post('/users/achievements',remoteUpload.single('image'), addAchievements);

//update/ patch 
achievementsRouter.patch('/users/achievements/:id', remoteUpload.single('image'), patchAchievements);

// Delete
achievementsRouter.delete('/users/achievements/:id', deletedAchievements);


// a method that will Get a all achievements records
// achievementsRouter.get('/users/achievements', getAchievements);


// Export router
export default achievementsRouter;