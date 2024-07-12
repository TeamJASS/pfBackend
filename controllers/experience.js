import { Experience } from "../models/experience.js"
import { experienceSchema } from "../schema/user_schema.js"



 // Get all Experience
  export const allExperience = async (req, res, next) => {
    try {
        const alExperience = await Experience.find(req.params);
        res.json(alExperience);
    } catch (error) {
        next(error);
    }
};



// Get a single Experience record
export const getExperience = async (req, res, next) => {
    try {
      // Get query Params
      const { limit, skip, filter } = req.query;
      // Get all Experience from database
      const allExperience = await  Experience
      .find({ name: filter })
      .limit(limit)
      .skip(skip);
      // Return all Experience as response
      res.json(allExperience);
    } catch (error) {
      next(error);
  
    }
  };
  
  // Post Experience

  export const addExperience = async ( req, res ) => {
    try {
      const {error, value} = experienceSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    } 
    console.log('value', value) 
    
    const experience = await Experience.create(value)
    res.status(201).json({experience:experience})
    
    } catch (error) {
      return res.status(500).send(error)
    }
  };
    




  // Patch experience

export const patchExperience = async (req, res, next) => {
  try {
      // Validate request body
      const { error, value } = experienceSchema.validate(req.body);
      if (error) {
          return res.status(400).send(error.details[0].message);
      }

      // Find and update the experience record
      const updatedexperience = await Experience.findByIdAndUpdate(
          req.params.id,
          value,
          { new: true, runValidators: true }
      );

      if (!updatedexperience) {
          return res.status(404).send('Experience record not found');
      }

      // Returns the updated experience record
      res.json(updatedexperience);
  } catch (error) {
      next(error);
  }
};



  
  //Delete experience
  
  export const deletedExperience = async (req, res, next) => {
    try {
        // Delete by ID
        const delExperience = await Experience.findByIdAndDelete(req.params.id);

        // Check if the record was not found and deleted
        if (!delExperience) {
            return res.status(404).send('Experience record not found');
        }

        // Return response indicating successful deletion
        res.status(200).json({ message: 'Experience record deleted successfully', deletedExperience });
    } catch (error) {
        next(error);
    }
  }