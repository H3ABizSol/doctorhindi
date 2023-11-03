import express from "express";
import authenticate from "../midlewares/authenticate";
import {
  createTopic,
  createTopicHealth,
  deleteTopic,
  deleteTopicHealth,
  getTopic,
  getTopicHealth,
  updateTopicHealth,
  uploadImg,
} from "../controlers/topic";
import uploadImage from "../helpers/multer";

const router = express.Router();

router.route("/create").post(createTopic);
router.route("/delete/:id").put(deleteTopic);
router.route("/upload/:id").put(uploadImage.single("img"), uploadImg);

router.route("/").get(getTopic);
router
  .route("/create/topichealth")
  .post(uploadImage.single("img"), createTopicHealth);

router.route("/get").get(getTopicHealth);
router.route("/deletecontent/:id").delete(deleteTopicHealth);
router
  .route("/updatecontent/:id")
  .put(uploadImage.single("img"), updateTopicHealth);

export default router;
