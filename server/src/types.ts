export interface IArticle extends Document {
  id: string;
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
  article_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date; // Soft delete
}

export interface IFind {
  article_id: string;
  offsets: number[];
}
