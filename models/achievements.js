import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const achievementSchema = new Schema({
  award: { type: String },
  description: { type: String },
  image: { type: String },
  date: { type: String },
  nameOfInstitution: { type: String },
  user: {
    type: Types.ObjectId, ref: "User", select: false
  }
}, {
  timestamps: true
});
achievementSchema.plugin(toJSON);

export const Achievement = model("Achievement", achievementSchema);
