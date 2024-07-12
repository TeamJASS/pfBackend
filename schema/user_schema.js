import joi from "joi";

export const userSchema = joi.object ({
    
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    otherNames: joi.string(),
    email: joi.string().email().required(),
    password : joi.string().min(4).max(50).required(),
    confirmPassword: joi.ref('password'),
    termsAndConditions: joi.boolean(),

})

export const userProfileSchema=joi.object({

    profilePicture:joi.string(),
    location:joi.string(),
    maritalStatus:joi.string().valid('single','married','prefer-not-to-say'),
    sex:joi.string().valid('male','female'),
    bio:joi.string(),
    about:joi.string(),
    dateOfBirth:joi.date(),
    contact:joi.string().required(),
    resume:joi.string().required(),
    
    })


    export const socialSchema = joi.object({
        githubLink: joi.string().uri().optional(),
        linkedIn: joi.string().uri().optional(),
        twitterLink: joi.string().uri().optional(),
      });
      
      export const skillSchema = joi.object({
        name: joi.string().required(),
        levelOfProficency: joi.string().valid("Beginner", "Intermediate", "Advance", "Expert").optional(),
      });
      
     export const experienceSchema = joi.object({
        companyName: joi.string().required(),
        role: joi.string().required(),
        skills: joi.string().optional(),
        responsibility: joi.string().required(),
        location: joi.string().optional(),
        startDate: joi.string(),
        endDate: joi.string(),
      });
      
      export const educationSchema = joi.object({
        schoolName: joi.string().required(),
        location: joi.string(),
        description: joi.string().optional(),
        program: joi.string().required(),
        image: joi.string().uri().optional(),
        grade: joi.string().optional(),
        startDate: joi.string(),
        endDate: joi.string(),
      });
      
      export const achievementsSchema = joi.object({
        awards: joi.string(),
        program: joi.string(),
        qualification: joi.string(),
        grade: joi.string().optional(),
        startDate: joi.string(),
        endDate: joi.string(),
      });
      
      export const projectSchema = joi.object({
        projectName: joi.string(),
        description: joi.string(),
        contribution: joi.string(),
        skills: joi.string(),
        link: joi.string().uri().optional(),
        nameOfInstitution: joi.string(),
        startDate: joi.string(),
        endDate: joi.string(),
      });
      
      export const volunteeringSchema = joi.object({
        organization: joi.string(),
        description: joi.string(),
        skills: joi.string(),
        link: joi.string().uri().optional(),
        nameOfInstitution: joi.string(),
        roles: joi.string(),
        responsbility: joi.string(),
        location: joi.string(),
        projectName: joi.string().optional(),
      });
    
  
    

