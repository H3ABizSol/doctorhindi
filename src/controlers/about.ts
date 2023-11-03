import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import aboutModel from "../models/about";

const createAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAbout = await aboutModel.findOne({ language: req.body.language });
    if (!isAbout) {
      if (req.file) {
        const about = await aboutModel.create({
          ...req.body,
          video: req.file?.filename,
        });
        return res.json({
          success: true,
          message: "created successfully",
          about,
        });
      } else {
        const about = await aboutModel.create({
          ...req.body,
        });
        return res.json({
          success: true,
          message: "created successfully",
          about,
        });
      }
    } else {
      if (req.file) {
        const about = await aboutModel.updateOne({
          $set: {
            ...req.body,
            video: req.file.filename,
          },
        });
        return res.json({
          success: true,
          message: "created successfully",
          about,
        });
      } else {
        console.log(req.body.language);
        const about = await aboutModel.updateOne({
          $set: {
            ...req.body,
          },
        });
        return res.json({
          success: true,
          message: "created successfully",
          about,
        });
      }
    }
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getLanguageDetails = async (req: Request, res: Response) => {
  const allAbout = await aboutModel.find({ language: req.body.language });
  if (allAbout.length === 0) {
    return res.json({ success: false, message: "no topic uploaded" });
  }
  return res.json({ success: true, allAbout });
};

const getAbout = async (req: Request, res: Response) => {
  const allAbout = await aboutModel.find({});
  if (allAbout.length === 0) {
    return res.json({ success: false, message: "no topic uploaded" });
  }
  return res.json({ success: true, allAbout });
};

// const deleteTopic = async (req: Request, res: Response) => {
//   if (req.body.img) {
//     fs.unlink(
//       path.join(__dirname, `../public/uploads/${req.body.img}`),
//       function (err) {
//         if (err && err.code == "ENOENT") {
//           console.info("File doesn't exist, won't remove it.");
//         }
//       }
//     );
//   }
//   const data = await topicModel.updateOne({
//     $pull: {
//       topics: {
//         _id: req.params.id,
//       },
//     },
//   });
//   return res.json({ success: true, message: "topic deleted successfully" });
// };

// const uploadImg = async (req: Request, res: Response) => {
//   console.log(req.file);
//   const upadatedData = await topicModel.updateOne(
//     { "topics._id": req.params.id },
//     {
//       $set: {
//         "topics.$.img": req.file?.filename,
//       },
//     },
//     { new: true }
//   );
// };

export { createAbout, getAbout, getLanguageDetails };
