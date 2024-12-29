import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    defaultValue: new Date(),
  },
  updated_at: {
    type: Date,
    defaultValue: new Date(),
  },
  deleted_at: {
    type: Date,
  },
});

// Middleware to update `updated_at` before saving
UserSchema.pre("save", function (next) {
  this.created_at = new Date(); // Update `updated_at` to the current time
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);
