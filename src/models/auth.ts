import mongoose, { model, Schema } from "mongoose";

const authSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  isAdmin: {
    type: String,
    trim: true,
    default: false,
  },
});

const liveSchema = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  link: [],
});

const appoitmentSchema = new Schema({
  hospitalname: {
    type: String,
  },
  mobile: [],
  address: {
    type: String,
  },
  days: {
    type: String,
  },
  timing: {
    type: String,
  },
});

const diseaseSchema = new Schema({
  diseaseName: { type: String },
  diseaseDesc: {
    type: String,
  },
});

const blogSchema = new Schema({
  title: { type: String },
  blogdesc: {
    type: String,
  },
  image: {
    type: String,
  },
});

const patientInfoSchema = new Schema({
  disease: { type: String },
  sublink: [
    {
      name: String,
      link: String,
    },
  ],
});

const healthInfoSchema = new Schema({
  diseaseName: { type: String, lowercase: true },
  sublink: [
    {
      name: String,
      link: String,
    },
  ],
});

const authModel = model("auth", authSchema);
const liveModel = model("live", liveSchema);
const appoitmentModel = model("appoitment", appoitmentSchema);
const diseaseContent = model("disease", diseaseSchema);
const blog = model("blog", blogSchema);
const patientInfo = model("patientInfo", patientInfoSchema);
const healthInfo = model("healthInfo", healthInfoSchema);

export default authModel;
export {
  liveModel,
  appoitmentModel,
  diseaseContent,
  blog,
  patientInfo,
  healthInfo,
};
