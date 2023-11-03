import express from "express";
import { createConsulation, getConsulation } from "../controlers/consulation";
import uploadImage from "../helpers/multer";

const router = express.Router();

router.route("/").get(getConsulation);
router.route("/create").post(uploadImage.single("video"), createConsulation);
// router.route("/delete/:id").put(deleteTopic);
// router.route("/upload/:id").put(uploadImage.single("img"), uploadImg);

export default router;
