import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import educationModel from "../models/education";
import consulationModel from "../models/education";

const createConsulation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isExist = await consulationModel.findOne({});
    if (!isExist) {
      if (req.file) {
        const consulation = await consulationModel.create({
          ...req.body,
          video: req.file.filename,
        });
      } else {
        const consulation = await consulationModel.create({
          ...req.body,
        });
      }
      return res.json({ success: true });
    } else {
      if (req.file) {
        const consulation = await consulationModel.updateOne({
          $set: {
            ...req.body,
            video: req.file.filename,
          },
        });
      } else {
        const consulation = await consulationModel.updateOne({
          $set: {
            ...req.body,
          },
        });
      }
      return res.json({ success: true });
    }
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getConsulation = async (req: Request, res: Response) => {
  const consulation = await consulationModel.findOne({});
  if (!consulation) {
    return res.json({ success: false, message: "no topic uploaded" });
  }
  return res.json({ success: true, consulation });
};

const deleteTopic = async (req: Request, res: Response) => {
  if (req.body.img) {
    fs.unlink(
      path.join(__dirname, `../public/uploads/${req.body.img}`),
      function (err) {
        if (err && err.code == "ENOENT") {
          console.info("File doesn't exist, won't remove it.");
        }
      }
    );
  }
  const data = await educationModel.updateOne({
    $pull: {
      topics: {
        _id: req.params.id,
      },
    },
  });
  console.log(data);
  return res.json({ success: true, message: "education deleted successfully" });
};

export { createConsulation, getConsulation };
