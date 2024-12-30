import mongoose, { Schema } from "mongoose";
import { IArticle } from "../types";

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
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

// Middleware to update `created_at` before saving
ArticleSchema.pre("save", function (next) {
  this.created_at = new Date();
  next();
});

export const Article = mongoose.model<IArticle>("Article", ArticleSchema);
