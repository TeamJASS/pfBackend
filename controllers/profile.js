import { userProfileModel } from "../models/profile.js";
import { userProfileSchema } from "../schemas/schema.js";
import { UserModel } from "../models/user.js";

export const createUserProfile = async (req, res, next) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
      resume: req.files.resume[0].filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await userProfileModel.create({
      ...value,
      user: userSessionId,
    });

    user.userProfile = profile._id;

    await user.save();

    res.status(201).json({ profile });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
      resume: req.files.resume[0].filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await userProfileModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.status(201).json({ profile });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res,next) => {
  try {
    //get user id from session or request
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const profile = await userProfileModel.find({ user: userSessionId });
    if (!profile) {
      return res.status(404).send("No profile added");
    }
    res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ error })
  }
};
