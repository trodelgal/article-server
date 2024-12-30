import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: unknown, req: Request, res: Response) => {
  if (error instanceof Error) {
    console.log(error.name);
    switch (error.name) {
      case "ValidationError":
        res.status(400).json({ error: error.message });
        break;
      case "CastError":
        res.status(404).json({ error: "Id not found" });
        break;
      case "MongoServerError":
        res.status(409).json({ error: error.message });
        break;
      default:
        res.status(500).json({ error: error.message });
    }
  } else {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};
