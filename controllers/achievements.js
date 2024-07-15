import { Achievement } from "../models/achievements.js"
import { achievementSchema } from "../schema/user_schema.js"
import { User } from "../models/user.js"



 // Post Achievements

 export const addAchievements = async ( req, res ) => {
//   try {
//     const {error, value} = achievementSchema.validate(req.body)
//   if (error) {
//     return res.status(400).send(error.details[0].message)
//   } 
//   console.log('value', value) 
  
//   const achievements = await Achievement.create(value)
//   res.status(201).json({achievements:achievements})
  
//   } catch (error) {
//     return res.status(500).send(error)
//   }
// };
  

try {
  const { error, value } = achievementSchema.validate({  
    ...req.body,
    award: req.files.award[0].filename,
    image: req.files.image[0].filename,});

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userSessionId = req.session.user.id;
 
  const user = await User.findById(userSessionId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const achievement = await Achievement.create({ ...value, user: userSessionId });

  user.achievements.push(achievement._id)

  await user.save();

  res.status(201).json({ achievement });
} catch (error) {
  console.log(error);
}
};



 // Get all Achievements
  export const allAchievements = async (req, res, next) => {
//     try {
//         const alAchievements = await Achievement.find(req.params);
//         res.json(alAchievements);
//     } catch (error) {
//         next(error);
//     }
// };

try {
  // fetch Achievements that belongs to a particular user
  const userSessionId = req.session.user.id
  const allAchievement = await Achievement.find({ user: userSessionId });
  if (allAchievement.length == 0) {
    return res.status(404).send("No Achievement added");
  }
  res.status(200).json({ Achievements: allAchievement });
} catch (error) {
  return res.status(500).json({error})
}
};



// del
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
  
 



  // Patch achievements

export const patchAchievements = async (req, res, next) => {
//   try {
//       // Validate request body
//       const { error, value } = achievementSchema.validate(req.body);
//       if (error) {
//           return res.status(400).send(error.details[0].message);
//       }
//       // Find and update the achievements record
//       const updateAchievements = await Achievement.findByIdAndUpdate(
//           req.params.id,
//           value,
//           { new: true, runValidators: true }
//       );

//       if (!updateAchievements) {
//           return res.status(404).send('Achievement record not found');
//       }
//       // Returns the updated Achievements record
//       res.json(updateAchievements);
//   } catch (error) {
//       next(error);
//   }
// };



try {
  const { error, value } = achievementSchema.validate({  
    ...req.body,
    award: req.files.award[0].filename,
    image: req.files.image[0].filename,});


  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userSessionId = req.session.user.id; 
  const user = await User.findById(userSessionId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const achievement = await Achievement.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!achievement) {
        return res.status(404).send("Achievement not found");
    }

  res.status(200).json({ achievement });
} catch (error) {
  return res.status(500).json({error})
}
};





  
  //Delete Achievements
  
  export const deletedAchievements = async (req, res, next) => {
  // try {
  //       // Delete by ID
  //       const delAchievements = await Achievements.findByIdAndDelete(req.params.id);

  //       // Check if the record was not found and deleted
  //       if (!delAchievements) {
  //           return res.status(404).send('Achievements record not found');
  //       }

  //       // Return response indicating successful deletion
  //       res.status(200).json({ message: 'Achievements record deleted successfully', deletedAchievements });
  //   } catch (error) {
  //       next(error);
  //   }
  // }



  try {
    const userSessionId = req.session.user.id; 
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await Achievement.findByIdAndDelete(req.params.id);
      if (!achievement) {
          return res.status(404).send("Achievement not found");
      }

      user.achievements.pull(req.params.id);
      await user.save();

    res.status(200).json("Achievement deleted");
  } catch (error) {
    return res.status(500).json({error})
  }
};
