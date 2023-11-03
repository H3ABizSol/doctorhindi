"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Errorhandler_1 = __importDefault(require("../helpers/Errorhandler"));
const auth_1 = __importDefault(require("../models/auth"));
const JWT_KEY = process.env.JWT_KEY;
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.token;
        jsonwebtoken_1.default.verify(token, JWT_KEY, async (err, decode) => {
            if (err) {
                return next(new Errorhandler_1.default(err, 500));
            }
            const info = await auth_1.default.findById(decode.id);
            if (info?.isAdmin) {
                next();
            }
            else {
                return res.json({
                    message: "you are not authenticate ",
                    success: false,
                });
            }
        });
    }
    catch (error) {
        return next(new Errorhandler_1.default(error, 500));
    }
};
exports.default = authenticate;
