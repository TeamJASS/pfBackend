import { project } from "../models/project.js"
import { projectSchema } from "../schema/user_schema.js"


 // Get all Projects
  export const getProjects = (req, res) => {
    res.json(`Project with id ${req.params.id} received`);
  };
  
// Get a project
export const getProject = async (req, res, next) => {
    try {
      // Get query Params
      const { limit, skip, filter } = req.query;
      // Get all Project from database
      const allProject = await  ProjectModel
      .find({ name: filter })
      .limit(limit)
      .skip(skip);
      // Return all project as response
      res.json(allProject);
    } catch (error) {
      next(error);
  
    }
  };
  
  // Post project
  export const postproject = async (req, res, next) => {
    try {
      // Add Project to database
      const allproject = await ProjectModel.create({
        ...req.body,
      image: req.file.filename
      });
      // return response
      res.json(allproject);
    } catch (error) {
      next(error);
    }
  };
  
  // Patch Project
  export const patchProject = (req, res) => {
    res.json(`Project updated with ${req.params.id} updated`)
  };
  
  //Delete Project
  export const deletedProject = async (req, res, next) => {
    try {
      // Delete by Id
      const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);
      // Return response
      res.json(deletedProject);
    } catch (error) {
      next(error);
    }
  };
  
 