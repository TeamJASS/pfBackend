import { Achievement } from "../models/achievements.js"
import { achievementSchema } from "../schemas/schema.js";
import { UserModel } from "../models/user.js"



 // Post Achievements

 export const addAchievements = async ( req, res, next ) => {

try {
  const { error, value } = achievementSchema.validate({  
    ...req.body,
    // award: req.files.award[0].filename,
    
    image: req.file.filename,});

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userSessionId = req.session.user.id;
 
  const user = await UserModel.findById(userSessionId);
  if (!user) {
    return res.status(404).send({message: "User not found"});
  }

  const achievement = await Achievement.create({ ...value, user: userSessionId });

  user.achievements.push(achievement._id)

  await user.save();

  res.status(201).json({ achievement });
} catch (error) {
  next(error);
}
};



 // Get all Achievements
  export const allAchievements = async (req, res, next) => {
try {
  // fetch Achievements that belongs to a particular user
  const userSessionId = req.session.user.id
  const allAchievement = await Achievement.find({ user: userSessionId });
  // if (allAchievement.length == 0) {
  //   return res.status(404).send("No Achievement added");
  // }
  res.status(200).json({ Achievements: allAchievement });
} catch (error) {
  next(error);
  // return res.status(500).json({error})
}
};




// Get an Achievement by id 

export const getAchievement =  async (req, res,next) => {
  try {
      const getAchievement =await Achievement.findById(req.params.id);
      res.status(200).json(getAchievement);
  } catch (error) {
      next(error);
  }
};


 



  // Patch achievements

export const patchAchievements = async (req, res, next) => {


try {
  const { error, value } = achievementSchema.validate({  
    ...req.body,
    // award: req.files.award[0].filename,
    // image: req.files.image[0].filename,});
    image: req.file.filename});

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userSessionId = req.session.user.id; 
  const user = await UserModel.findById(userSessionId);
  if (!user) {
    return res.status(404).send({message: "User not found"});
  }

  const achievement = await Achievement.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!achievement) {
        return res.status(404).send({message: "Achievement not found"});
    }

  res.status(200).json({ achievement });
} catch (error) {
  next(error);
}
};





  
  //Delete Achievements
  
  export const deletedAchievements = async (req, res, next) => {

  try {
    const userSessionId = req.session.user.id; 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }

    const achievement = await Achievement.findByIdAndDelete(req.params.id);
      if (!achievement) {
          return res.status(404).send({message: "Achievement not found"});
      }

      user.achievements.pull(req.params.id);
      await user.save();

    res.status(200).json({message: "Achievement deleted"});
  } catch (error) {
    next(error);
  }
};
