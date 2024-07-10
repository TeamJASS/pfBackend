import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const volunteringSchema = new Schema(
        {
          organization: { type: String },
          description: { type: String },
          skills: { type: String },
          link: { type: String },
          nameOfInstitution: { type: String },
          roles: { type: String },
          responsbility: { type: String },
          location: { type: String },
          projectName: { type: String },
          user: { type: Types.ObjectId, ref: 'User' }
        }
    );

    
export const Voluntering = model("Voluntering", volunteringSchema); 