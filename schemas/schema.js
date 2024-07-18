import joi from "joi";

export const registerSchema = joi.object({
    firstname: joi.string().required(),
    lastname:joi.string().required(),
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const loginSchema = joi.object({
    username: joi.string().alphanum(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const userProfileSchema = joi.object({

    profilePicture: joi.string(),
    location: joi.string(),
    maritalStatus: joi.string().valid('single', 'married', 'prefer-not-to-say'),
    sex: joi.string().valid('male', 'female'),
    bio: joi.string(),
    about: joi.string(),
    dateOfBirth: joi.date(),
    contact: joi.string(),
    resume: joi.string(),
    githubLink: joi.string().uri().optional(),
    linkedinLink: joi.string().uri().optional(),
    twitterLink: joi.string().uri().optional(),
    user: joi.string()

})



export const skillSchema = joi.object({
    name: joi.string().required(),
    levelOfProficency: joi.string().valid("Beginner", "Intermediate", "Advance", "Expert").optional(),
    user: joi.string()
});

export const experienceSchema = joi.object({
    companyName: joi.string().required(),
    role: joi.string().required(),
    skills: joi.string().optional(),
    responsibility: joi.string().required(),
    location: joi.string().optional(),
    startDate: joi.string(),
    endDate: joi.string(),
    user: joi.string()

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
    user: joi.string()

});

export const achievementSchema = joi.object({
    award: joi.string(),
    description: joi.string(),
    image: joi.string(),
    date: joi.string(),
    nameOfInstitution: joi.string(),
    user: joi.string()

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
    user: joi.string()

});

export const volunteeringSchema = joi.object({
    organization: joi.string(),
    description: joi.string(),
    skills: joi.string(),
    link: joi.string().uri().optional(),
    nameOfInstitution: joi.string(),
    responsbility: joi.string(),
    location: joi.string(),
    projectName: joi.string().optional(),
    user: joi.string().required()
  organisation: joi.string().required(),
  description: joi.string().required(),
  skills: joi.string(),
  startDate: joi.string().required(),
  endDate: joi.string(),
  role: joi.string().required(),
  responsibility: joi.string().required(),
  location: joi.string(),
  projectName: joi.string(),
  user: joi.string()
});




