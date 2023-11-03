"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aboutSchema = new mongoose_1.Schema({
    language: {
        type: String,
    },
    quote: {
        type: String,
    },
    aboutdesc: {
        type: String,
    },
    video: {
        type: String,
    },
});
const aboutModel = (0, mongoose_1.model)("about", aboutSchema);
exports.default = aboutModel;
