import express from "express";
import authenticate from "../midlewares/authenticate";
import { createAbout, getAbout, getLanguageDetails } from "../controlers/about";
import uploadImage from "../helpers/multer";

const router = express.Router();

router.route("/").get(getAbout);
router.route("/getlanuagedetails").post(getLanguageDetails);

router.route("/create").post(uploadImage.single("video"), createAbout);
// router.route("/delete/:id").put(deleteTopic);
// router.route("/upload/:id").put(uploadImage.single("img"), uploadImg);

export default router;
