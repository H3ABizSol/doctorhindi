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
exports.changeForgotPassword = exports.forgotPassword = exports.sendEmail = exports.deleteHealthInfo = exports.updateHealthInfo = exports.getHealthInfo = exports.createHealthInfo = exports.deletePatientInfo = exports.updatePatientInfo = exports.getPatientInfo = exports.createPatientInfo = exports.deleteBlog = exports.updateBlog = exports.getSingleBlog = exports.getBlog = exports.createBlog = exports.deleteDisease = exports.updateDisease = exports.getDisease = exports.createDisease = exports.updateAppoitment = exports.deleteAppoitment = exports.getAppoitment = exports.createAppoitment = exports.getLive = exports.createLive = exports.isAdmin = exports.login = exports.register = void 0;
const Errorhandler_1 = __importDefault(require("../helpers/Errorhandler"));
const comparepassword_1 = __importDefault(require("../helpers/comparepassword"));
const generatetoken_1 = __importDefault(require("../helpers/generatetoken"));
const hashpassword_1 = __importDefault(require("../helpers/hashpassword"));
const auth_1 = __importStar(require("../models/auth"));
const mail_1 = __importStar(require("../helpers/mail"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = process.env.JWT_KEY;
const register = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashPass = await (0, hashpassword_1.default)(password);
        const info = await auth_1.default.create({
            ...req.body,
            password: hashPass,
        });
        info.password = undefined;
        return res.json({ success: true, message: "register successfully", info });
    }
    catch (error) {
        return next(new Errorhandler_1.default(error, 500));
        res.json({ success: false, message: error.message });
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        const isExist = await auth_1.default.findOne({ email });
        console.log(isExist);
        if (!isExist) {
            return res.json({ message: "user does not exist", success: false });
        }
        const oldPassword = isExist.password;
        const match = await (0, comparepassword_1.default)(password, oldPassword);
        if (!match) {
            return res.json({
                message: "email or password incorrect",
                success: false,
            });
        }
        const id = isExist._id;
        const token = await (0, generatetoken_1.default)(id);
        res.cookie("jwt_admin_payload", token, {
            secure: true,
            httpOnly: true,
        });
        return res.json({ success: true, token });
    }
    catch (error) {
        return next(new Errorhandler_1.default(error, 500));
    }
};
exports.login = login;
const isAdmin = (req, res) => {
    return res.json({ success: true });
};
exports.isAdmin = isAdmin;
const createLive = async (req, res, next) => {
    try {
        let liveLink = [];
        const url = req.body.link.split(",");
        for (const items of url) {
            liveLink.push(items);
        }
        console.log(liveLink);
        const isExist = await auth_1.liveModel.findOne({});
        if (!isExist) {
            if (req.file) {
                await auth_1.liveModel.create({
                    ...req.body,
                    link: liveLink,
                    image: req.file.filename,
                });
            }
            else {
                await auth_1.liveModel.create({
                    ...req.body,
                    link: liveLink,
                });
            }
        }
        else {
            if (req.file) {
                await auth_1.liveModel.updateOne({
                    $set: {
                        ...req.body,
                        link: liveLink,
                        image: req.file.filename,
                    },
                });
            }
            else {
                await auth_1.liveModel.updateOne({
                    $set: {
                        ...req.body,
                        link: liveLink,
                    },
                });
            }
        }
        return res.json({ success: true });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createLive = createLive;
const getLive = async (req, res, next) => {
    try {
        const live = await auth_1.liveModel.findOne({});
        return res.json({ success: true, live });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.getLive = getLive;
const createAppoitment = async (req, res, next) => {
    try {
        const { hospitalname, mobile, address, days, timing } = req.body;
        if (!hospitalname || !mobile || !address || !days || !timing) {
            return res.json({ success: false, message: "please include all fields" });
        }
        const arrMobile = [];
        const arr = mobile.split(",");
        for (const items of arr) {
            arrMobile.push(items);
        }
        const appoitment = await auth_1.appoitmentModel.create({
            ...req.body,
            mobile: arrMobile,
        });
        return res.json({ success: true, appoitment });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createAppoitment = createAppoitment;
const getAppoitment = async (req, res, next) => {
    try {
        const appoitment = await auth_1.appoitmentModel.find({});
        console.log(appoitment.length);
        if (appoitment.length === 0) {
            return res.json({ success: false, message: "appoitment not uploaded" });
        }
        return res.json({ success: true, appoitment });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.getAppoitment = getAppoitment;
const deleteAppoitment = async (req, res, next) => {
    try {
        const appoitment = await auth_1.appoitmentModel.findByIdAndDelete(req.params.id);
        return res.json({
            success: true,
            appoitment,
            message: "delete successfully",
        });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.deleteAppoitment = deleteAppoitment;
const updateAppoitment = async (req, res, next) => {
    try {
        const appoitment = await auth_1.appoitmentModel.findByIdAndUpdate(req.params.id, {
            $set: {
                ...req.body,
            },
        });
        return res.json({
            success: true,
            appoitment,
            message: "update successfully",
        });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.updateAppoitment = updateAppoitment;
const createDisease = async (req, res, next) => {
    try {
        const { diseaseName, diseaseDesc } = req.body;
        if (!diseaseName || !diseaseDesc) {
            return res.json({ success: false, message: "please include all fields" });
        }
        const disease = await auth_1.diseaseContent.create({
            ...req.body,
        });
        return res.json({ success: true, disease });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createDisease = createDisease;
const getDisease = async (req, res, next) => {
    try {
        const disease = await auth_1.diseaseContent.find({});
        return res.json({ success: true, disease });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.getDisease = getDisease;
const updateDisease = async (req, res, next) => {
    try {
        const disease = await auth_1.diseaseContent.findByIdAndUpdate(req.params.id, {
            $set: {
                ...req.body,
            },
        });
        return res.json({
            success: true,
            disease,
            message: "update successfully",
        });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.updateDisease = updateDisease;
const deleteDisease = async (req, res, next) => {
    try {
        const disease = await auth_1.diseaseContent.findByIdAndDelete(req.params.id);
        return res.json({ success: true, disease, message: "delete successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.deleteDisease = deleteDisease;
const createBlog = async (req, res, next) => {
    try {
        const { title, blogdesc } = req.body;
        console.log(req.body);
        if (!title || !blogdesc) {
            return res.json({ success: false, message: "please include all fields" });
        }
        if (!req.body.image) {
            return res.json({ success: false, message: "please select file" });
        }
        const allBlog = await auth_1.blog.create({
            ...req.body,
        });
        return res.json({ success: true, allBlog });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createBlog = createBlog;
const getBlog = async (req, res, next) => {
    const allBlogs = await auth_1.blog.find({});
    return res.json({ success: true, allBlogs });
};
exports.getBlog = getBlog;
const getSingleBlog = async (req, res, next) => {
    const singleBlog = await auth_1.blog.findById(req.params.id);
    return res.json({ success: true, singleBlog });
};
exports.getSingleBlog = getSingleBlog;
const updateBlog = async (req, res, next) => {
    try {
        console.log(req.body);
        if (req.body.image) {
            await auth_1.blog.findByIdAndUpdate(req.params.id, {
                $set: {
                    ...req.body,
                },
            });
            return res.json({ success: true, message: "update successfully" });
        }
        await auth_1.blog.findByIdAndUpdate(req.params.id, {
            $set: {
                ...req.body,
            },
        });
        return res.json({ success: true, message: "update successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res, next) => {
    try {
        const Blog = await auth_1.blog.findById(req.params.id);
        fs_1.default.unlink(path_1.default.join(__dirname, `../public/uploads/${Blog.image}`), (err) => {
            if (err) {
                console.log(err);
            }
        });
        await auth_1.blog.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: "delete successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.deleteBlog = deleteBlog;
const createPatientInfo = async (req, res, next) => {
    try {
        const { disease, subDisease, link } = req.body;
        const subDiseaseSplit = subDisease.split(",");
        const linkSplit = link.split(",");
        const sublink = [];
        subDiseaseSplit.map((i, index) => {
            sublink.push({
                name: i,
                link: linkSplit[index],
            });
        });
        const patientInformation = await auth_1.patientInfo.create({
            disease,
            sublink,
        });
        res.json({ success: true, patientInformation });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createPatientInfo = createPatientInfo;
const getPatientInfo = async (req, res, next) => {
    try {
        const patientInformation = await auth_1.patientInfo.find({});
        res.json({ success: true, patientInformation });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.getPatientInfo = getPatientInfo;
const updatePatientInfo = async (req, res, next) => {
    try {
        const { disease, subDisease, link } = req.body;
        const subDiseaseSplit = subDisease.split(",");
        const linkSplit = link.split(",");
        const sublink = [];
        subDiseaseSplit.map((i, index) => {
            sublink.push({
                name: i,
                link: linkSplit[index],
            });
        });
        const patientInformation = await auth_1.patientInfo.findByIdAndUpdate(req.params.id, {
            $set: {
                disease,
                sublink,
            },
        });
        res.json({ success: true, message: "update successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.updatePatientInfo = updatePatientInfo;
const deletePatientInfo = async (req, res, next) => {
    try {
        const patientInformation = await auth_1.patientInfo.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "delete successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.deletePatientInfo = deletePatientInfo;
const createHealthInfo = async (req, res, next) => {
    try {
        const { disease, subDisease, link } = req.body;
        const subDiseaseSplit = subDisease.split(",");
        const linkSplit = link.split(",");
        const sublink = [];
        subDiseaseSplit.map((i, index) => {
            sublink.push({
                name: i,
                link: linkSplit[index],
            });
        });
        const patientInformation = await auth_1.healthInfo.create({
            diseaseName: disease,
            sublink,
        });
        res.json({ success: true, patientInformation });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.createHealthInfo = createHealthInfo;
const getHealthInfo = async (req, res, next) => {
    try {
        const healthInformation = await auth_1.healthInfo.find({}).sort({ disease: 1 });
        res.json({ success: true, healthInformation });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.getHealthInfo = getHealthInfo;
const updateHealthInfo = async (req, res, next) => {
    try {
        const { disease, subDisease, link } = req.body;
        const subDiseaseSplit = subDisease.split(",");
        const linkSplit = link.split(",");
        const sublink = [];
        subDiseaseSplit.map((i, index) => {
            sublink.push({
                name: i,
                link: linkSplit[index],
            });
        });
        const patientInformation = await auth_1.healthInfo.findByIdAndUpdate(req.params.id, {
            $set: {
                diseaseName: disease,
                sublink,
            },
        });
        res.json({ success: true, message: "update successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.updateHealthInfo = updateHealthInfo;
const deleteHealthInfo = async (req, res, next) => {
    try {
        const patientInformation = await auth_1.healthInfo.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "delete successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.deleteHealthInfo = deleteHealthInfo;
const sendEmail = (req, res) => {
    const { email, message, mobile, disease, name } = req.body;
    if (!email || !message || !mobile || !disease || !name) {
        return res.json({ success: false, message: "please include all fields" });
    }
    (0, mail_1.default)({ ...req.body });
    return res.json({ success: true, message: "mail was sent" });
};
exports.sendEmail = sendEmail;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "please enter your mail" });
    }
    const isExist = await auth_1.default.findOne({ email });
    if (!isExist) {
        return res.json({
            success: false,
            message: "email was not found check your email",
        });
    }
    const id = isExist._id;
    const token = (0, generatetoken_1.default)(id);
    console.log(token);
    const link = `${req.protocol}://${req.get("host")}/forgotpassword/${token}`;
    (0, mail_1.sendMailForgot)({
        email,
        link,
    });
    return res.json({ success: true, message: "mail was sent" });
};
exports.forgotPassword = forgotPassword;
const changeForgotPassword = async (req, res) => {
    const { password } = req.body;
    jsonwebtoken_1.default.verify(req.params.token, JWT_KEY, async (err, decode) => {
        if (err) {
            return res.json({ success: false, err });
        }
        const info = await auth_1.default.findById(decode.id);
        console.log(info);
        if (info?.isAdmin) {
            const hashPass = await (0, hashpassword_1.default)(password);
            await auth_1.default.findByIdAndUpdate(decode.id, {
                $set: {
                    password: hashPass,
                },
            });
            res.json({
                success: true,
                message: "password change successfully",
            });
        }
        else {
            return res.json({
                message: "you are not admin",
                success: false,
            });
        }
    });
};
exports.changeForgotPassword = changeForgotPassword;
