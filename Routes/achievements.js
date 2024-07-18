import { Router } from "express";
import { allAchievements, getAchievement, addAchievements, patchAchievements, deletedAchievements } from "../controllers/achievements.js";
import { remoteUpload } from "../middleware/uploads.js";

// Create a Router
const achievementsRouter = Router();

// get all achievements record
achievementsRouter.get('/users/achievements', allAchievements);

// a method that will Get an achievement by id
achievementsRouter.get('/users/achievements/:id', getAchievement);


// Add  all achievements record
achievementsRouter.post('/users/achievements',remoteUpload.single('image'), addAchievements);

//update/ patch 
achievementsRouter.patch('/users/achievements/:id', remoteUpload.single('image'), patchAchievements);

// Delete
achievementsRouter.delete('/users/achievements/:id', deletedAchievements);



// Export router
export default achievementsRouter;