"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_1 = require("../controlers/about");
const multer_1 = __importDefault(require("../helpers/multer"));
const router = express_1.default.Router();
router.route("/").get(about_1.getAbout);
router.route("/getlanuagedetails").post(about_1.getLanguageDetails);
router.route("/create").post(multer_1.default.single("video"), about_1.createAbout);
// router.route("/delete/:id").put(deleteTopic);
// router.route("/upload/:id").put(uploadImage.single("img"), uploadImg);
exports.default = router;
