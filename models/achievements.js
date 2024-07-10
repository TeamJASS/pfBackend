import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const achievementsSchema = new Schema(
        {
          awards: { type: String },
          program: { type: String },
          qualification: { type: String },
          grade: { type: String },
          startDate: { type: String },
          endDate: { type: String },
          user: { type: Types.ObjectId, ref: 'User' }
        },  
);

export const Achievements = model("Achivements", achievementsSchema); 