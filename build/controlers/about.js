"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageDetails = exports.getAbout = exports.createAbout = void 0;
const about_1 = __importDefault(require("../models/about"));
const createAbout = async (req, res, next) => {
    try {
        const isAbout = await about_1.default.findOne({ language: req.body.language });
        if (!isAbout) {
            if (req.file) {
                const about = await about_1.default.create({
                    ...req.body,
                    video: req.file?.filename,
                });
                return res.json({
                    success: true,
                    message: "created successfully",
                    about,
                });
            }
            else {
                const about = await about_1.default.create({
                    ...req.body,
                });
                return res.json({
                    success: true,
                    message: "created successfully",
                    about,
                });
            }
        }
        else {
            if (req.file) {
                const about = await about_1.default.updateOne({
                    $set: {
                        ...req.body,
                        video: req.file.filename,
                    },
                });
                return res.json({
                    success: true,
                    message: "created successfully",
                    about,
                });
            }
            else {
                console.log(req.body.language);
                const about = await about_1.default.updateOne({
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
        }
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createAbout = createAbout;
const getLanguageDetails = async (req, res) => {
    const allAbout = await about_1.default.find({ language: req.body.language });
    if (allAbout.length === 0) {
        return res.json({ success: false, message: "no topic uploaded" });
    }
    return res.json({ success: true, allAbout });
};
exports.getLanguageDetails = getLanguageDetails;
const getAbout = async (req, res) => {
    const allAbout = await about_1.default.find({});
    if (allAbout.length === 0) {
        return res.json({ success: false, message: "no topic uploaded" });
    }
    return res.json({ success: true, allAbout });
};
exports.getAbout = getAbout;
