import { Experience } from "../models/experience.js"
import { UserModel} from "../models/user.js"
import { experienceSchema } from "../schemas/schema.js";


 // Get all Experience
  export const allExperience = async (req, res, next) => {
    try {
      //we are fetching Experience that belongs to a particular user
      const userSessionId = req.session?.user?.id || req?.user.id;
      const alExperience = await Experience.find({ user: userSessionId });
      // if (alExperience.length == 0) {
      //   return res.status(404).send("No Experience added");
      // }
      res.status(200).json({ Experience: alExperience });
    } catch (error) {
     next(error);
    }
  };


// Get an Experience record by ID
export const getExperience =  async (req, res,next) => {
  try {
      const getExperience =await Experience.findById(req.params.id);
      res.status(200).json(getExperience);
  } catch (error) {
      next(error);
  }
};
  
  // Create/Add Experience
  export const addExperience = async ( req, res, next ) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user.id;
     
  
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.create({ ...value, user: userSessionId });
  
    user.experience.push(experience._id)
  
      await user.save();
  
      res.status(201).json({ experience });
    } catch (error) {
      next(error);
    }
  };





  // Update experience

export const patchExperience = async (req, res, next) => {
try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user.id;
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
      res.status(200).json({ experience });
    } catch (error) {
      next(error);
    }
  };




  
  //Delete experience
  
  export const deletedExperience = async (req, res, next) => {
    try {
      const userSessionId = req.session?.user?.id || req?.user.id;
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
        user.experience.pull(req.params.id);
        await user.save();
      res.status(200).json("Experience deleted");
    } catch (error) {
      next(error);
    }
  };