import { Router, Request, Response } from "express";
import { User } from "../models";
import { errorHandler } from "../helper";
import { IUser } from "../types";
import { emailRegex } from "../validation";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: "Id not found" });
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!emailRegex.test(req.body.email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json("User created successfully with id:" + user.id);
  } catch (error: unknown) {
    errorHandler(error, req, res);
  }
});

export default router;
