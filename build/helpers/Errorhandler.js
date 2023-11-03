"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errorhandler extends Error {
    constructor(message, statusCode) {
        super(message);
        statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = Errorhandler;
