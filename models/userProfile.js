import { model, Schema } from "mongoose";


const userProfileSchema =newSchema({
    profilePicture: { type: String },
    location: { type: String },
    maritalStatus: { type: String, enum: ["single", "married", "perfer-not-to-say"] },
    sex: { type: String, enum: ["male", "female"] },
    bio: { type: String },
    about: { type: String },
    dateOfBirth: { type: Date },
    contact: { type: String },
    resume: { type: String },
    languages: { type: String },
    githubLink: { type: String },
    linkedIn: { type: String },
    twitterLink: { type: String },
    user:{type:Types.ObjectId, ref:"User"},
}) 
export const UserProfile = model("UserProfile",userProfileSchema);
