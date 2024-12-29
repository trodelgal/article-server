import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { corsHandler, routeNotFound } from "./middleware";
import router from "./routes";

const app: Express = express();
app.use(express.json());
app.use(morgan("combined"));

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body);
//   next();
// });

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.use(routeNotFound);

export default app;
