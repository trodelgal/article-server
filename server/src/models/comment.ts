import mongoose, { Schema } from "mongoose";
export const CommentSchema = new Schema({
  articleId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
export const Comment = mongoose.model("Comment", CommentSchema);
