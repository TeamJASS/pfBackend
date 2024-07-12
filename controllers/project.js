import { Project } from "../models/project.js";
import { projectSchema } from "../schema/user_schema.js";



// Get all Projects
export const getProjects = async (req, res, next) => {
  try {
      const allProject = await Project.find();
      res.json(allProject);
  } catch (error) {
      next(error);
  }
};



// Get a project
export const getProject = async (req, res, next) => {
  try {
    // Get query Params
    const { limit, skip, filter } = req.query;
    // Get all Project from database
    const project = await Project.find({ name: filter })
      .limit(limit)
      .skip(skip);
    // Return all project as response
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// Post project
// export const postproject = async (req, res, next) => {
//   const { error, value } = projectSchema.validate(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0], message);
//   }
//   try {
//     // Add Project to database
//     const addproject = await Project.create({
//       ...req.body,
//       image: req.file.filename,
//     });
//     // return response
//     res.status(201).json(addproject);
//   } catch (error) {
//     next(error);
//   }
// };


export const postproject = async (req, res, next) => {
  const { error, value } = projectSchema.validate(req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }
  try {
      // Add Project to database
      const addproject = await Project.create({
          ...req.body,
          image: req.file ? req.file.filename : undefined, // Handle the case when req.file is not present
      });
      // return response
      res.status(201).json(addproject);
  } catch (error) {
      next(error);
  }
};



// Patch Project
export const patchProject = (req, res) => {
  const { error, value } = projectSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0], message);
  }
  res.json(`Project updated with ID ${req.params.id} updated`);
};

try {
  // Add Project to database
  const addproject = await Project.create({
    ...req.body,
    image: req.file.filename,
  });
  // return response
  res.json(addproject);
} catch (error) {
//  next(error);
};



//Delete Project
export const deletedProject = async (req, res, next) => {
  try {
    // Delete by Id
    const delProject = await Project.findByIdAndDelete(req.params.id);
    // Return response
    res.json(delProject);
  } catch (error) {
    next(error);
  }
};
