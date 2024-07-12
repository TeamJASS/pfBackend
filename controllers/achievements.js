import { Achievement } from "../models/achievements.js"
import { achievementSchema } from "../schema/user_schema.js"



 // Get all Achievements
  export const allAchievements = async (req, res, next) => {
    try {
        const alAchievements = await Achievement.find(req.params);
        res.json(alAchievements);
    } catch (error) {
        next(error);
    }
};



// Get a single Achievements record
export const getAchievements = async (req, res, next) => {
    try {
      // Get query Params
      const { limit, skip, filter } = req.query;
      // Get all Achievements from database
      const allAchievements = await  Achievement
      .find({ name: filter })
      .limit(limit)
      .skip(skip);
      // Return all Achievements as response
      res.json(allAchievements);
    } catch (error) {
      next(error);
  
    }
  };
  
  // Post Achievements

  export const addAchievements = async ( req, res ) => {
    try {
      const {error, value} = achievementSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    } 
    console.log('value', value) 
    
    const achievements = await Achievement.create(value)
    res.status(201).json({achievements:achievements})
    
    } catch (error) {
      return res.status(500).send(error)
    }
  };
    




  // Patch achievements

export const patchAchievements = async (req, res, next) => {
  try {
      // Validate request body
      const { error, value } = achievementSchema.validate(req.body);
      if (error) {
          return res.status(400).send(error.details[0].message);
      }

      // Find and update the achievements record
      const updateAchievements = await Achievement.findByIdAndUpdate(
          req.params.id,
          value,
          { new: true, runValidators: true }
      );

      if (!updateAchievements) {
          return res.status(404).send('Achievement record not found');
      }

      // Returns the updated Achievements record
      res.json(updateAchievements);
  } catch (error) {
      next(error);
  }
};



  
  //Delete Achievements
  
  export const deletedAchievements = async (req, res, next) => {
    try {
        // Delete by ID
        const delAchievements = await Achievements.findByIdAndDelete(req.params.id);

        // Check if the record was not found and deleted
        if (!delAchievements) {
            return res.status(404).send('Achievements record not found');
        }

        // Return response indicating successful deletion
        res.status(200).json({ message: 'Achievements record deleted successfully', deletedAchievements });
    } catch (error) {
        next(error);
    }
  }