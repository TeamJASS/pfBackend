import { Project } from "../models/project.js";
import { UserModel } from "../models/user.js";
import { projectSchema } from "../schemas/schema.js";


// Get all Projects
export const getProjects = async (req, res, next) => {
  try {
    //we are fetching Project that belongs to a particular user
    const userSessionId = req.session.user.id
    const allProject = await Project.find({ user: userSessionId });
    // if (allProject.length == 0) {
    //   return res.status(404).send("No Project added");
    // }
    res.status(200).json({ Projects: allProject });
  } catch (error) {
    next(error);
  }
};



// Get a Project record by ID
export const getProject =  async (req, res,next) => {
  try {
      const getProject =await Project.findById(req.params.id);
      res.status(200).json(getProject);
  } catch (error) {
      next(error);
  }
};


// Post/Create project

export const postproject = async (req, res, next) => {
  try {
    const { error, value } = projectSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
   
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }

    const project = await Project.create({ ...value, user: userSessionId });

    user.projects.push(project._id)

    await user.save();

    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
};



// Patch Project
export const patchProject = async (req, res, next) => {
try {
  const { error, value } =  projectSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userSessionId = req.session.user.id; 
  const user = await UserModel.findById(userSessionId);
  if (!user) {
    return res.status(404).send({message: "User not found"});
  }

  const project = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!project) {
        return res.status(404).send({message: "Project not found"});
    }

  res.status(200).json({ project });
} catch (error) {
      next(error);
}
};




//Delete Project
export const deletedProject = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id; 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }

    const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
          return res.status(404).send({message: "Project not found"});
      }

      user.projects.pull(req.params.id);
      await user.save();
    res.status(200).json({message: "Project deleted"});
  } catch (error) {
    next(error);
  }
};