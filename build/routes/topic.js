"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topic_1 = require("../controlers/topic");
const multer_1 = __importDefault(require("../helpers/multer"));
const router = express_1.default.Router();
router.route("/create").post(topic_1.createTopic);
router.route("/delete/:id").put(topic_1.deleteTopic);
router.route("/upload/:id").put(multer_1.default.single("img"), topic_1.uploadImg);
router.route("/").get(topic_1.getTopic);
router
    .route("/create/topichealth")
    .post(multer_1.default.single("img"), topic_1.createTopicHealth);
router.route("/get").get(topic_1.getTopicHealth);
router.route("/deletecontent/:id").delete(topic_1.deleteTopicHealth);
router
    .route("/updatecontent/:id")
    .put(multer_1.default.single("img"), topic_1.updateTopicHealth);
exports.default = router;
