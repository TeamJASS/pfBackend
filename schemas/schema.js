import joi from "joi";

export const registerSchema = joi.object({
    firstname: joi.string().required(),
    lastname:joi.string().required(),
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
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
    contact: joi.string().required(),
    resume: joi.string().required(),
    githubLink: joi.string().uri().optional(),
    linkedIn: joi.string().uri().optional(),
    twitterLink: joi.string().uri().optional(),
    createdBy: joi.string().required()

})



export const skillSchema = joi.object({
    name: joi.string().required(),
    levelOfProficency: joi.string().valid("Beginner", "Intermediate", "Advance", "Expert").optional(),
    user: joi.string().required()

});

export const experienceSchema = joi.object({
    companyName: joi.string().required(),
    role: joi.string().required(),
    skills: joi.string().optional(),
    responsibility: joi.string().required(),
    location: joi.string().optional(),
    startDate: joi.string(),
    endDate: joi.string(),
    user: joi.string().required()

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
    user: joi.string().required()

});

export const achievementSchema = joi.object({
    awards: joi.string(),
    description: joi.string(),
    image: joi.string(),
    date: joi.string(),
    nameOfInstitution: joi.string(),
    user: joi.string().required()

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
    user: joi.string().required()

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
    user: joi.string().required()

});




