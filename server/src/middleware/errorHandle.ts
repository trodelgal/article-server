import { Request, Response, NextFunction } from "express";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    error: "Route not found",
  });
};

/**
 * Middleware to handle unsupported HTTP methods
 * @param allowedMethods - Array of allowed HTTP methods for the route
 */
export const methodNotAllowed = (allowedMethods: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedMethods.includes(req.method)) {
      res.status(405).json({
        error: `Method ${
          req.method
        } is not allowed on this route. Allowed methods: ${allowedMethods.join(
          ", "
        )}`,
      });
    } else {
      next(); // Proceed to the next middleware if the method is allowed
    }
  };
};
