import { Express, Response, Request, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    message: err.message,
    success: false,
  });
};

export default errorHandler;
