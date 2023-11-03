"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const education_1 = require("../controlers/education");
const multer_1 = __importDefault(require("../helpers/multer"));
const router = express_1.default.Router();
router.route("/").get(education_1.getTopic);
router.route("/create").post(education_1.createTopic);
router.route("/delete/:id").put(education_1.deleteTopic);
router.route("/upload/:id").put(multer_1.default.single("img"), education_1.uploadImg);
exports.default = router;
