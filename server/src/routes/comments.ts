import { Router, Request, Response } from "express";
import { Comment } from "../models";
import { Article } from "../models";
import { errorHandler } from "../helper";
import { methodNotAllowed } from "../middleware";
import { IArticle, IComment } from "../types";

const router = Router();

router.use(methodNotAllowed(["GET", "POST"]));

router.get("/", async (req: Request, res: Response) => {
  try {
    const comments: IComment[] = await Comment.find();
    res.json(comments);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const comment: IComment | null = await Comment.findById(req.params.id);
    comment ? res.json(comment) : res.status(404).json("Id not found");
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const comment = new Comment(req.body);
    const article: IArticle | null = await Article.findById(comment.article_id);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    await comment.save();
    res.status(201).json("Comment created successfully with id:" + comment.id);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

export default router;
