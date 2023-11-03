"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const consulationSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    video: {
        type: String,
    },
    callnumber: {
        type: String,
    },
    whatsappnumber: {
        type: String,
    },
    email: {
        type: String,
    },
});
const consulationModel = (0, mongoose_1.model)("consulation", consulationSchema);
exports.default = consulationModel;
