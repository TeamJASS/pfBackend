import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const experienceSchema = new Schema(
        {
          companyName: { type: String },
          role: { type: String },
          skills: { type: String },
          resposibiliy: { type: String },
          location: { type: String },
          startDate: { type: String },
          endDate: { type: String },
        }
);

experienceSchema.plugin(toJSON);

export const Experience = model("Experience", experienceSchema); 