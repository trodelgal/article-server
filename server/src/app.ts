import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();
app.use(express.json());
app.use(morgan("combined"));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

export default app;
