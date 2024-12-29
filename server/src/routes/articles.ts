import { Router, Request, Response } from "express";
import { Article } from "../models";
import { errorHandler } from "../helper";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    article
      ? res.status(200).json(article)
      : res.status(404).json("Id not found");
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json("User created successfully with id:" + article.id);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

export default router;
