import { Request, Response, NextFunction } from "express";
import topicModel, { topicContent } from "../models/topics";

import fs from "fs";
import path from "path";

const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topics } = req.body;
    const arrTopics = topics.split(",");
    const allTopics = [];
    for (const items of arrTopics) {
      const obj = {
        name: items,
      };
      allTopics.push(obj);
    }

    const isExist = await topicModel.findOne({});
    if (isExist) {
      await topicModel.updateOne({
        $push: {
          topics: {
            $each: allTopics,
          },
        },
      });
      return res.json({ success: true });
    }

    await topicModel.create({
      topics: allTopics,
    });
    return res.json({ success: true });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getTopic = async (req: Request, res: Response) => {
  const allTopics = await topicModel.findOne({});
  if (!allTopics) {
    return res.json({ success: false, message: "no topic uploaded" });
  }
  return res.json({ success: true, allTopics });
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
  const data = await topicModel.updateOne({
    $pull: {
      topics: {
        _id: req.params.id,
      },
    },
  });
  return res.json({ success: true, message: "topic deleted successfully" });
};

const uploadImg = async (req: Request, res: Response) => {
  const upadatedData = await topicModel.updateOne(
    { "topics._id": req.params.id },
    {
      $set: {
        "topics.$.img": req.file?.filename,
      },
    },
    { new: true }
  );
  return res.json({ success: true, upadatedData });
};

const createTopicHealth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subject, topic, heading, desc, heading2, desc2 } = req.body;
    if (!subject || !topic || !heading || !desc || !heading2 || !desc2) {
      return res.json({ success: false, message: "please include all fields" });
    }

    if (req.file) {
      await topicContent.create({
        ...req.body,
        image: req.file.filename,
      });
    } else {
      await topicContent.create({
        ...req.body,
      });
    }
    return res.json({ success: true });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getTopicHealth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topichealth = await topicContent.find({});
    return res.json({ success: true, topichealth });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const deleteTopicHealth = async (req: Request, res: Response) => {
  const content = await topicContent.findById(req.params.id);
  fs.unlink(
    path.join(__dirname, `../public/uploads/${content?.image}`),
    function (err) {
      if (err && err.code == "ENOENT") {
        console.info("File doesn't exist, won't remove it.");
      }
    }
  );
  await topicContent.findByIdAndDelete(req.params.id);
  return res.json({ success: true, message: "topic deleted successfully" });

  // if (req.body.img) {
  //   fs.unlink(
  //     path.join(__dirname, `../public/uploads/${req.body.img}`),
  //     function (err) {
  //       if (err && err.code == "ENOENT") {
  //         console.info("File doesn't exist, won't remove it.");
  //       }
  //     }
  //   );
  // }
  // const data = await topicModel.updateOne({
  //   $pull: {
  //     topics: {
  //       _id: req.params.id,
  //     },
  //   },
  // });
};

const updateTopicHealth = async (req: Request, res: Response) => {
  console.log(req.body);
  if (req.file) {
    const about = await topicContent.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
        image: req.file.filename,
      },
    });
    return res.json({
      success: true,
      message: "update successfully",
      about,
    });
  } else {
    const about = await topicContent.findByIdAndUpdate(req.params.id, {
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
};

export {
  createTopic,
  getTopic,
  deleteTopic,
  uploadImg,
  createTopicHealth,
  getTopicHealth,
  deleteTopicHealth,
  updateTopicHealth,
};
