import mongoose, { Schema } from "mongoose";
import { IComment } from "../types";

const CommentSchema = new Schema({
  article_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
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
CommentSchema.pre("save", function (next) {
  this.created_at = new Date(); // Update `updated_at` to the current time
  next();
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
