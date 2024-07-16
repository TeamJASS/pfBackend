import { Schema, model, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json'


const userSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    termsAndConditions: { type: Boolean }, 
    education: [{ type: Types.ObjectId, ref: 'Education' }],
    skills: [{ type: Types.ObjectId, ref: 'Skill' }],
    achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
    projects: [{ type: Types.ObjectId, ref: 'Project' }],
    userProfile: { type: Types.ObjectId, ref: 'UserProfile' },
    volunteering: [{ type: Types.ObjectId, ref: 'Volunteering' }],
    experience: [{ type: Types.ObjectId, ref: 'Experience' }],

},{
    timestamps:true
})
userSchema.plugin(toJSON)

export const UserModel = model("User", userSchema)
