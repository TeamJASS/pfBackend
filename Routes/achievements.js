import { Router } from "express";
import { allAchievements, addAchievements, patchAchievements, deletedAchievements, getAchievements } from "../controllers/achievements.js";


// Create a Router
const achievementsRouter = Router();

// get an achievements record
achievementsRouter.get('/achievements/:id', allAchievements);


// Add  all achievements record
achievementsRouter.post('/achievements', addAchievements);

//update/ patch 
achievementsRouter.patch('/achievements/:id', patchAchievements);

// Delete
achievementsRouter.delete('/achievements/:id', deletedAchievements);

// a method that will Get a all achievements records
achievementsRouter.get('/achievements', getAchievements);



// Export router
export default achievementsRouter;