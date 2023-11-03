import multer from "multer";
import path from "path";
import fs from "fs";

import { Request } from "express";

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req: Request, file, cb: CallableFunction) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req: Request, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({ storage: storage });

export default uploadImage;
