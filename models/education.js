import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const educationSchema = new Schema(
        {
          schoolName: { type: String },
          location: { type: String },
         description: { type: String },
          program: { type: String },
          image: { type: String },
          grade: { type: String },
          startDate: { type: String },
          endDate: { type: String },
          user: { type: Types.ObjectId, ref: 'User' }
        },
);

educationSchema.plugin(toJSON);

export const Education = model("Education", educationSchema); 