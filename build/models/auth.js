"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthInfo = exports.patientInfo = exports.blog = exports.diseaseContent = exports.appoitmentModel = exports.liveModel = void 0;
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    isAdmin: {
        type: String,
        trim: true,
        default: false,
    },
});
const liveSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    link: [],
});
const appoitmentSchema = new mongoose_1.Schema({
    hospitalname: {
        type: String,
    },
    mobile: [],
    address: {
        type: String,
    },
    days: {
        type: String,
    },
    timing: {
        type: String,
    },
});
const diseaseSchema = new mongoose_1.Schema({
    diseaseName: { type: String },
    diseaseDesc: {
        type: String,
    },
});
const blogSchema = new mongoose_1.Schema({
    title: { type: String },
    blogdesc: {
        type: String,
    },
    image: {
        type: String,
    },
});
const patientInfoSchema = new mongoose_1.Schema({
    disease: { type: String },
    sublink: [
        {
            name: String,
            link: String,
        },
    ],
});
const healthInfoSchema = new mongoose_1.Schema({
    diseaseName: { type: String, lowercase: true },
    sublink: [
        {
            name: String,
            link: String,
        },
    ],
});
const authModel = (0, mongoose_1.model)("auth", authSchema);
const liveModel = (0, mongoose_1.model)("live", liveSchema);
exports.liveModel = liveModel;
const appoitmentModel = (0, mongoose_1.model)("appoitment", appoitmentSchema);
exports.appoitmentModel = appoitmentModel;
const diseaseContent = (0, mongoose_1.model)("disease", diseaseSchema);
exports.diseaseContent = diseaseContent;
const blog = (0, mongoose_1.model)("blog", blogSchema);
exports.blog = blog;
const patientInfo = (0, mongoose_1.model)("patientInfo", patientInfoSchema);
exports.patientInfo = patientInfo;
const healthInfo = (0, mongoose_1.model)("healthInfo", healthInfoSchema);
exports.healthInfo = healthInfo;
exports.default = authModel;
