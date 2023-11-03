"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailForgot = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
    },
});
const sendMail = (mail) => {
    var mailOptions = {
        from: process.env.SMPT_USER,
        to: mail.email,
        subject: "Sending Email.",
        text: `${mail.message}\n Disease:- ${mail.disease}\n Mobile:-${mail.mobile}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info);
        }
    });
};
const sendMailForgot = (mail) => {
    var mailOptions = {
        from: process.env.SMPT_USER,
        to: mail.email,
        subject: "Sending Email.",
        text: `${mail.link}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info);
        }
    });
};
exports.sendMailForgot = sendMailForgot;
exports.default = sendMail;
