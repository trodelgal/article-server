export interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date; // Soft delete
}

export interface IUser extends Document {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IComment extends Document {
  articleId: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date; // Soft delete
}
