import { Education } from "../models/education.js"
import { educationSchema } from "../schema/education_schema.js"

// export const education = async ( req, res ) => {

//   const {error, value} = educationSchema.validate(req.body)
//   if (error) {
//     return res.status(400).send(error.details[0],message)
//   }


// }


// export const education = async ( req, res ) => {

//   const {error, value} = educationSchema.validate(req.body)
//   if (education.length = 0) {
//     return res.status(404).send('N education added')
//   }

//   export const
//     res.status(200).json(education);

// }

//  another error handling for getting an ed. without adding





 // Get all Education
  export const allEducation = async (req, res, next) => {
    try {
        const alEducation = await Education.find();
        res.json(alEducation);
    } catch (error) {
        next(error);
    }
};



// Get a single Educational record
export const getEducation = async (req, res, next) => {
    try {
      // Get query Params
      const { limit, skip, filter } = req.query;
      // Get all Education from database
      const allEducation = await  Education
      .find({ name: filter })
      .limit(limit)
      .skip(skip);
      // Return all Education as response
      res.json(allEducation);
    } catch (error) {
      next(error);
  
    }
  };
  
  // Post Education

  // 1st process
  // export const postEducation = async (req, res, next) => {
  //   try {
  //     // Add Education to database
  //     const allEducation = await Education.create({
  //       ...req.body,
  //     image: req.file.filename
  //     });
  //     // return response
  //     res.json(allEducation);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  

  // masbsjd
  export const addEducation = async ( req, res ) => {
    try {
      const {error, value} = educationSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    } 
    console.log('value', value) 
    
    const education = await Education.create(value)
    res.status(201).json({education:education})
    
    } catch (error) {
      return res.status(500).send(error)
    }
  };
    
  

// poiuhyegdhj
  //   export const addEducation = async (req, res) => {
  //     try {
  //         // Validate request body
  //         const { error, value } = educationSchema.validate(req.body);
  //         if (error) {
  //             return res.status(400).send(error.details[0].message);
  //         }
  
  //         // Log the validated value
  //         console.log('value', value);
  
  //         // Add education to the database
  //         const education = await Education.create(value);
  
  //         // Return response
  //         res.status(201).json({ education });
  //     } catch (error) {
  //         console.error('Error adding education:', error);
  //         return res.status(500).send('An error occurred while adding education.');
  //     }
  // };
  





  // Patch Education
  // 1st
  // export const editEducation = (req, res) => {
  //   res.json(`Education updated with ${req.params.id} updated`)
  // };



export const patchEducation = async (req, res, next) => {
  try {
      // Validate request body
      const { error, value } = educationSchema.validate(req.body);
      if (error) {
          return res.status(400).send(error.details[0].message);
      }

      // Find and update the education record
      const updatedEducation = await Education.findByIdAndUpdate(
          req.params.id,
          value,
          { new: true, runValidators: true }
      );

      if (!updatedEducation) {
          return res.status(404).send('Education record not found');
      }

      // Returns the updated education record
      res.json(updatedEducation);
  } catch (error) {
      next(error);
  }
};



  
  //Delete Education
  // 1st
  // export const deletedEducation = async (req, res, next) => {
  //   try {
  //     // Delete by Id
  //     const deletedEducation = await Education.findByIdAndDelete(req.params.id);
  //     // Return response
  //     res.json(deletedEducation);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  
 
  export const deletedEducation = async (req, res, next) => {
    try {
        // Delete by ID
        const delEducation = await Education.findByIdAndDelete(req.params.id);

        // Check if the record was not found and deleted
        if (!delEducation) {
            return res.status(404).send('Education record not found');
        }

        // Return response indicating successful deletion
        res.status(200).json({ message: 'Education record deleted successfully', deletedEducation });
    } catch (error) {
        next(error);
    }
  }