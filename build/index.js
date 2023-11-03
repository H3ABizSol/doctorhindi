"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./Db/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const topic_1 = __importDefault(require("./routes/topic"));
const consulation_1 = __importDefault(require("./routes/consulation"));
const error_1 = __importDefault(require("./midlewares/error"));
const about_1 = __importDefault(require("./routes/about"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// set_variabales
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
// connect database
(0, db_1.default)(DB_URL);
// middlewares
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
// routes
app.use("/api/auth", auth_1.default);
app.use("/api/topic", topic_1.default);
app.use("/api/consulation", consulation_1.default);
app.use("/api/about", about_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist/")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/dist/index.html"));
});
//error handling
app.use(error_1.default);
// listen server at port
app.listen(PORT, () => {
    console.log(`server connected port is ${PORT}`);
});
