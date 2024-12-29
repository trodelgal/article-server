import { Router, Request, Response } from "express";
import { Comment } from "../models";
import { errorHandler } from "../helper";
import { methodNotAllowed } from "../middleware";

const router = Router();

router.use(methodNotAllowed(["GET", "POST"]));

router.get("/", async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    comment ? res.json(comment) : res.status(404).json("Id not found");
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.json("Comment created successfully with id:" + comment.id);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

export default router;
