import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import DB_CONNECT from "./Db/db";
import authRouter from "./routes/auth";
import topicRouter from "./routes/topic";
import consulationRouter from "./routes/consulation";
import errorHandler from "./midlewares/error";
import aboutRouter from "./routes/about";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// set_variabales
const PORT = process.env.PORT;
const DB_URL: any = process.env.DB_URL;

// connect database
DB_CONNECT(DB_URL);

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

// routes
app.use("/api/auth", authRouter);
app.use("/api/topic", topicRouter);
app.use("/api/consulation", consulationRouter);
app.use("/api/about", aboutRouter);

app.use(express.static(path.join(__dirname, "../client/dist/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

//error handling
app.use(errorHandler);

// listen server at port
app.listen(PORT, () => {
  console.log(`server connected port is ${PORT}`);
});
