"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DB_CONNECT = async (url) => {
    await mongoose_1.default.connect(url);
    console.log("DB CONNECTED");
};
exports.default = DB_CONNECT;
