import { Router } from "express";
import { methodNotAllowed } from "../middleware";
import userRouter from "./users";
import commentsRouter from "./comments";
import articlesRouter from "./articles";

const router = Router();

router.use("/users", userRouter);
router.use("/comments", commentsRouter);
router.use("/articles", articlesRouter);

router.all("*", methodNotAllowed(["GET", "POST"]));

export default router;
