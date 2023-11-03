"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consulation_1 = require("../controlers/consulation");
const multer_1 = __importDefault(require("../helpers/multer"));
const router = express_1.default.Router();
router.route("/").get(consulation_1.getConsulation);
router.route("/create").post(multer_1.default.single("video"), consulation_1.createConsulation);
// router.route("/delete/:id").put(deleteTopic);
// router.route("/upload/:id").put(uploadImage.single("img"), uploadImg);
exports.default = router;
