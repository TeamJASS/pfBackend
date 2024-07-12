import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const achievementSchema = new Schema({
  awards: { type: String },
  program: { type: String },
  qualification: { type: String },
  grade: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  user: { type: Types.ObjectId, ref: "User" },
});

achievementSchema.plugin(toJSON);

export const Achievement = model("Achievement", achievementSchema);
