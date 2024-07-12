import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const skillSchema = new Schema({
  name: { type: String },
  levelOfProficency: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advance", "Expert"],
    user: { type: Types.ObjectId, ref: "User" },
  },
});

skillSchema.plugin(toJSON);

export const Skill = model("Skill", skillSchema);
