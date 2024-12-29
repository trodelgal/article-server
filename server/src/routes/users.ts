import { Router, Request, Response } from "express";
import { User } from "../models";
import { errorHandler } from "../helper";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.status(200).json(user) : res.status(404).json("Id not found");
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json("User created successfully with id:" + user.id);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

export default router;
