import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  otherNames: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  userName: { type: String, unique: true },
  termsAndConditions: { type: Boolean },
});

userSchema.plugin(toJSON);

export const User = model("User", userSchema);
