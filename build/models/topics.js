"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicContent = void 0;
const mongoose_1 = require("mongoose");
const topicSchema = new mongoose_1.Schema({
    topics: [
        {
            name: { type: String },
            img: {
                type: String,
                default: "",
            },
        },
    ],
});
const topicContentSchema = new mongoose_1.Schema({
    subject: {
        type: String,
    },
    topic: {
        type: String,
    },
    heading: {
        type: String,
    },
    desc: {
        type: String,
    },
    heading2: {
        type: String,
    },
    desc2: {
        type: String,
    },
    image: {
        type: String,
    },
});
const topicModel = (0, mongoose_1.model)("topic", topicSchema);
const topicContent = (0, mongoose_1.model)("topicContent", topicContentSchema);
exports.topicContent = topicContent;
exports.default = topicModel;
