import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Errorhandler from "../helpers/Errorhandler";
import authModel from "../models/auth";
const JWT_KEY: any = process.env.JWT_KEY;

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.token;
    jwt.verify(token, JWT_KEY, async (err: any, decode: any) => {
      if (err) {
        return next(new Errorhandler(err, 500));
      }
      const info = await authModel.findById(decode.id);
      if (info?.isAdmin) {
        next();
      } else {
        return res.json({
          message: "you are not authenticate ",
          success: false,
        });
      }
    });
  } catch (error) {
    return next(new Errorhandler(error, 500));
  }
};

export default authenticate;
