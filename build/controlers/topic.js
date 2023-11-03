"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTopicHealth = exports.deleteTopicHealth = exports.getTopicHealth = exports.createTopicHealth = exports.uploadImg = exports.deleteTopic = exports.getTopic = exports.createTopic = void 0;
const topics_1 = __importStar(require("../models/topics"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createTopic = async (req, res, next) => {
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
        const isExist = await topics_1.default.findOne({});
        if (isExist) {
            await topics_1.default.updateOne({
                $push: {
                    topics: {
                        $each: allTopics,
                    },
                },
            });
            return res.json({ success: true });
        }
        await topics_1.default.create({
            topics: allTopics,
        });
        return res.json({ success: true });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createTopic = createTopic;
const getTopic = async (req, res) => {
    const allTopics = await topics_1.default.findOne({});
    if (!allTopics) {
        return res.json({ success: false, message: "no topic uploaded" });
    }
    return res.json({ success: true, allTopics });
};
exports.getTopic = getTopic;
const deleteTopic = async (req, res) => {
    if (req.body.img) {
        fs_1.default.unlink(path_1.default.join(__dirname, `../public/uploads/${req.body.img}`), function (err) {
            if (err && err.code == "ENOENT") {
                console.info("File doesn't exist, won't remove it.");
            }
        });
    }
    const data = await topics_1.default.updateOne({
        $pull: {
            topics: {
                _id: req.params.id,
            },
        },
    });
    return res.json({ success: true, message: "topic deleted successfully" });
};
exports.deleteTopic = deleteTopic;
const uploadImg = async (req, res) => {
    const upadatedData = await topics_1.default.updateOne({ "topics._id": req.params.id }, {
        $set: {
            "topics.$.img": req.file?.filename,
        },
    }, { new: true });
    return res.json({ success: true, upadatedData });
};
exports.uploadImg = uploadImg;
const createTopicHealth = async (req, res, next) => {
    try {
        const { subject, topic, heading, desc, heading2, desc2 } = req.body;
        if (!subject || !topic || !heading || !desc || !heading2 || !desc2) {
            return res.json({ success: false, message: "please include all fields" });
        }
        if (req.file) {
            await topics_1.topicContent.create({
                ...req.body,
                image: req.file.filename,
            });
        }
        else {
            await topics_1.topicContent.create({
                ...req.body,
            });
        }
        return res.json({ success: true });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createTopicHealth = createTopicHealth;
const getTopicHealth = async (req, res, next) => {
    try {
        const topichealth = await topics_1.topicContent.find({});
        return res.json({ success: true, topichealth });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.getTopicHealth = getTopicHealth;
const deleteTopicHealth = async (req, res) => {
    const content = await topics_1.topicContent.findById(req.params.id);
    fs_1.default.unlink(path_1.default.join(__dirname, `../public/uploads/${content?.image}`), function (err) {
        if (err && err.code == "ENOENT") {
            console.info("File doesn't exist, won't remove it.");
        }
    });
    await topics_1.topicContent.findByIdAndDelete(req.params.id);
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
exports.deleteTopicHealth = deleteTopicHealth;
const updateTopicHealth = async (req, res) => {
    console.log(req.body);
    if (req.file) {
        const about = await topics_1.topicContent.findByIdAndUpdate(req.params.id, {
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
    }
    else {
        const about = await topics_1.topicContent.findByIdAndUpdate(req.params.id, {
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
exports.updateTopicHealth = updateTopicHealth;
