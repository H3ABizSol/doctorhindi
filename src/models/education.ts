import mongoose, { model, Schema } from "mongoose";

const consulationSchema = new Schema({
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

const consulationModel = model("consulation", consulationSchema);

export default consulationModel;
