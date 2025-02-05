import { Skill } from "../models/skills.js";
import { UserModel } from "../models/user.js";
import { skillSchema } from "../schemas/schema.js";




// Get All skills
export const allSkills = async (req, res, next) => {
  try {
    //we are fetching Skill that belongs to a particular user
    const userSessionId = req.session?.user?.id || req?.user.id;
    const allSkill = await Skill.find({ user: userSessionId });
    // if (allSkill.length == 0) {
    //   return res.status(404).send("No Skill added");
    // }
    res.status(200).json({ Skills: allSkill });
  } catch (error) {
    next(error);
  }
};



  // Post Skills

  export const addSkills = async ( req, res, next ) => {
    try {
      const { error, value } = skillSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId =  req.session?.user?.id || req?.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await Skill.create({ ...value, user: userSessionId });
  
      user.skills.push(skill._id)
  
      await user.save();
  
      res.status(201).json({ skill });
    } catch (error) {
      next(error);
    }
  };


// Get a Skills record by ID
export const getSkills =  async (req, res,next) => {
  try {
      const getSkills =await Skill.findById(req.params.id);
      res.status(200).json(getSkills);
  } catch (error) {
      next(error);
  }
};





  // Patch Skills

export const patchSkills = async (req, res, next) => {
  try {
    const { error, value } = skillSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user.id; 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skill.findByIdAndUpdate(req.params.id, value, { new: true });
      if (!skill) {
          return res.status(404).send("Skill not found");
      }

    res.status(200).json({ skill });
  } catch (error) {
    next(error);
  }
};



  
  //Delete SkillS
  
  export const deletedSkills = async (req, res, next) => {
    try {
      const userSessionId = req.session?.user?.id || req?.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
  
        user.skills.pull(req.params.id);
        await user.save();
      res.status(200).json("Skill deleted");
    } catch (error) {
      next(error);
    }
  };
  