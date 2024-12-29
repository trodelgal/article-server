import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { routeNotFound } from "./middleware/errorHandle";
import router from "./routes";

const app: Express = express();
app.use(express.json());
app.use(morgan("combined"));

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.use(routeNotFound);

export default app;
