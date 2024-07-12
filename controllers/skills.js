import { Skill } from "../models/skills.js";
import { skillSchema } from "../schema/user_schema.js";
import { User } from "../models/user.js";

// Get All skills
export const allSkills = async (req, res, next) => {
try {
    const alSkills = await Skill.find(req.params);
    res.json(alSkills);
    
} catch (error) {
    next(error);
}
};

// Use filter to find skills

export const getSkills = async (req, res, next) => {
    try {
      // Get query Params
      const { limit, skip, filter } = req.query;
      // Get all SkillS from database
      const allSkillS = await  Skill
      .find({ name: filter })
      .limit(limit)
      .skip(skip);
      // Return all SkillS as response
      res.json(allSkillS);
    } catch (error) {
      next(error);
  
    }
  };
  
  // Post Skills

  export const addSkills = async ( req, res ) => {

    try {
        
        const {error, value} = skillSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
          } 
      // create Skills with value
          const skills = await skillModel.create(value);

        //   After , Find the user with ID
const user = await user.findById(value, User);
    if (!user){
        return res.status(404).send('User not found');
    }
      
    // If user is found then push the skills ID you just created
    const userSkill = await user.findById(value, User);
    if (!userSkill){
        return res.status(404).send('User not fopund');
    }

    // If user is found then push the Skill ID 
    user.skill.push(skills._id);

    // and save the current user in the skills
    await user.save();

    // return the skills
    res.status(201).json({ skills });

    } catch (error) {
        
    }
    
  };
    




  // Patch Skills

export const patchSkills = async (req, res, next) => {
  try {
      // Validate request body
      const { error, value } = skillSchema.validate(req.body);
      if (error) {
          return res.status(400).send(error.details[0].message);
      }

      // Find and update the SkillS record
      const updateSkills = await Skill.findByIdAndUpdate(
          req.params.id,
          value,
          { new: true, runValidators: true }
      );

      if (!updateSkills) {
          return res.status(404).send('Skill record not found');
      }

      // Returns the updated SkillS record
      res.json(updateSkills);
  } catch (error) {
      next(error);
  }
};



  
  //Delete SkillS
  
  export const deletedSkills = async (req, res, next) => {
    try {
        // Delete by ID
        const delSkills = await SkillS.findByIdAndDelete(req.params.id);

        // Check if the record was not found and deleted
        if (!delSkills) {
            return res.status(404).send('SkillS record not found');
        }

        // Return response indicating successful deletion
        res.status(200).json({ message: 'SkillS record deleted successfully', deletedSkills });
    } catch (error) {
        next(error);
    }
  }
