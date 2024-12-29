import { Router, Request, Response } from "express";
import { Article } from "../models";
import { errorHandler } from "../helper";
import { IArticle } from "../types";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const articles: IArticle[] = await Article.find();
    res.status(200).json(articles);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const article: IArticle | null = await Article.findById(req.params.id);
    article
      ? res.status(200).json(article)
      : res.status(404).json("Id not found");
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.get("/find/:str", async (req: Request, res: Response) => {
  try {
    const str = req.params.str;
    const articles: IArticle[] = await Article.find();
    let arr = [];
    articles.forEach((article: IArticle) => {
      let indexes = [];
      let index = article.content.indexOf(str);
      while (index !== -1) {
        indexes.push(index);
        index = article.content.indexOf(str, index + 1); // Search from the next position
      }
      if (indexes.length > 0) {
        arr.push({ article_id: article.id, offsets: indexes });
      }
    });
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
