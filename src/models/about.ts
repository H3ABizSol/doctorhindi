import mongoose, { model, Schema } from "mongoose";

const aboutSchema = new Schema({
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

const aboutModel = model("about", aboutSchema);

export default aboutModel;
