import mongoose, { model, Schema } from "mongoose";

const topicSchema = new Schema({
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

const topicContentSchema = new Schema({
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

const topicModel = model("topic", topicSchema);
const topicContent = model("topicContent", topicContentSchema);

export default topicModel;
export { topicContent };
