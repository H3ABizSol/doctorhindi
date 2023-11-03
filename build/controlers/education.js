"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImg = exports.deleteTopic = exports.getTopic = exports.createTopic = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const education_1 = __importDefault(require("../models/education"));
const createTopic = async (req, res, next) => {
    console.log("helo");
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
        const isExist = await education_1.default.findOne({});
        if (isExist) {
            await education_1.default.updateOne({
                $push: {
                    topics: {
                        $each: allTopics,
                    },
                },
            });
            return res.json({ success: true });
        }
        await education_1.default.create({
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
    const allTopics = await education_1.default.findOne({});
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
    const data = await education_1.default.updateOne({
        $pull: {
            topics: {
                _id: req.params.id,
            },
        },
    });
    console.log(data);
    return res.json({ success: true, message: "education deleted successfully" });
};
exports.deleteTopic = deleteTopic;
const uploadImg = async (req, res) => {
    console.log(req.file);
    const upadatedData = await education_1.default.updateOne({ "topics._id": req.params.id }, {
        $set: {
            "topics.$.img": req.file?.filename,
        },
    }, { new: true });
};
exports.uploadImg = uploadImg;
