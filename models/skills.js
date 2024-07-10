import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const skillsSchema = new Schema({
  name: { type: String },
  levelOfProficency: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advance", "Expert"],
    user: { type: Types.ObjectId, ref: "User" },
  },
});

skillsSchema.plugin(toJSON);

export const Skills = model("Skills", skillsSchema);
