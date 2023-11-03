"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConsulation = exports.createConsulation = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const education_1 = __importDefault(require("../models/education"));
const education_2 = __importDefault(require("../models/education"));
const createConsulation = async (req, res, next) => {
    try {
        const isExist = await education_2.default.findOne({});
        if (!isExist) {
            if (req.file) {
                const consulation = await education_2.default.create({
                    ...req.body,
                    video: req.file.filename,
                });
            }
            else {
                const consulation = await education_2.default.create({
                    ...req.body,
                });
            }
            return res.json({ success: true });
        }
        else {
            if (req.file) {
                const consulation = await education_2.default.updateOne({
                    $set: {
                        ...req.body,
                        video: req.file.filename,
                    },
                });
            }
            else {
                const consulation = await education_2.default.updateOne({
                    $set: {
                        ...req.body,
                    },
                });
            }
            return res.json({ success: true });
        }
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createConsulation = createConsulation;
const getConsulation = async (req, res) => {
    const consulation = await education_2.default.findOne({});
    if (!consulation) {
        return res.json({ success: false, message: "no topic uploaded" });
    }
    return res.json({ success: true, consulation });
};
exports.getConsulation = getConsulation;
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
