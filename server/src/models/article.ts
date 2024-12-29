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

export const Article = mongoose.model<IArticle>("Article", ArticleSchema);
