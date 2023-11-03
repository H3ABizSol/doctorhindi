"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = process.env.JWT_KEY;
const generateToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, key, {
        expiresIn: "48h",
    });
    return token;
};
exports.default = generateToken;
