import Errorhandler from "../helpers/Errorhandler";
import comparePassword from "../helpers/comparepassword";
import generateToken from "../helpers/generatetoken";
import hashPassword from "../helpers/hashpassword";
import authModel, {
  appoitmentModel,
  blog,
  diseaseContent,
  healthInfo,
  liveModel,
  patientInfo,
} from "../models/auth";
import { Request, Response, NextFunction } from "express";
import sendMail, { sendMailForgot } from "../helpers/mail";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
const JWT_KEY: any = process.env.JWT_KEY;

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const hashPass = await hashPassword(password);
    const info = await authModel.create({
      ...req.body,
      password: hashPass,
    });
    info.password = undefined;
    return res.json({ success: true, message: "register successfully", info });
  } catch (error: any) {
    return next(new Errorhandler(error, 500));
    res.json({ success: false, message: error.message });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, email } = req.body;
    const isExist = await authModel.findOne({ email });
    console.log(isExist);
    if (!isExist) {
      return res.json({ message: "user does not exist", success: false });
    }
    const oldPassword: any = isExist.password;
    const match = await comparePassword(password, oldPassword);
    if (!match) {
      return res.json({
        message: "email or password incorrect",
        success: false,
      });
    }
    const id: any = isExist._id;
    const token = await generateToken(id);
    res.cookie("jwt_admin_payload", token, {
      secure: true,
      httpOnly: true,
    });
    return res.json({ success: true, token });
  } catch (error: any) {
    return next(new Errorhandler(error, 500));
  }
};

const isAdmin = (req: Request, res: Response) => {
  return res.json({ success: true });
};

const createLive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let liveLink: String[] = [];
    const url = req.body.link.split(",");
    for (const items of url) {
      liveLink.push(items);
    }
    console.log(liveLink);
    const isExist = await liveModel.findOne({});
    if (!isExist) {
      if (req.file) {
        await liveModel.create({
          ...req.body,
          link: liveLink,
          image: req.file.filename,
        });
      } else {
        await liveModel.create({
          ...req.body,
          link: liveLink,
        });
      }
    } else {
      if (req.file) {
        await liveModel.updateOne({
          $set: {
            ...req.body,
            link: liveLink,
            image: req.file.filename,
          },
        });
      } else {
        await liveModel.updateOne({
          $set: {
            ...req.body,
            link: liveLink,
          },
        });
      }
    }

    return res.json({ success: true });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getLive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const live = await liveModel.findOne({});
    return res.json({ success: true, live });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const createAppoitment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hospitalname, mobile, address, days, timing } = req.body;
    if (!hospitalname || !mobile || !address || !days || !timing) {
      return res.json({ success: false, message: "please include all fields" });
    }
    const arrMobile = [];
    const arr = mobile.split(",");
    for (const items of arr) {
      arrMobile.push(items);
    }
    const appoitment = await appoitmentModel.create({
      ...req.body,
      mobile: arrMobile,
    });
    return res.json({ success: true, appoitment });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getAppoitment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appoitment = await appoitmentModel.find({});
    console.log(appoitment.length);
    if (appoitment.length === 0) {
      return res.json({ success: false, message: "appoitment not uploaded" });
    }
    return res.json({ success: true, appoitment });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const deleteAppoitment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appoitment = await appoitmentModel.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      appoitment,
      message: "delete successfully",
    });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const updateAppoitment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appoitment = await appoitmentModel.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
      },
    });
    return res.json({
      success: true,
      appoitment,
      message: "update successfully",
    });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const createDisease = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { diseaseName, diseaseDesc } = req.body;
    if (!diseaseName || !diseaseDesc) {
      return res.json({ success: false, message: "please include all fields" });
    }
    const disease = await diseaseContent.create({
      ...req.body,
    });
    return res.json({ success: true, disease });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getDisease = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const disease = await diseaseContent.find({});
    return res.json({ success: true, disease });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const updateDisease = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const disease = await diseaseContent.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
      },
    });
    return res.json({
      success: true,
      disease,
      message: "update successfully",
    });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const deleteDisease = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const disease = await diseaseContent.findByIdAndDelete(req.params.id);
    return res.json({ success: true, disease, message: "delete successfully" });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, blogdesc } = req.body;
    console.log(req.body);
    if (!title || !blogdesc) {
      return res.json({ success: false, message: "please include all fields" });
    }
    if (!req.body.image) {
      return res.json({ success: false, message: "please select file" });
    }
    const allBlog = await blog.create({
      ...req.body,
    });
    return res.json({ success: true, allBlog });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  const allBlogs = await blog.find({});
  return res.json({ success: true, allBlogs });
};

const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const singleBlog = await blog.findById(req.params.id);
  return res.json({ success: true, singleBlog });
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    if (req.body.image) {
      await blog.findByIdAndUpdate(req.params.id, {
        $set: {
          ...req.body,
        },
      });
      return res.json({ success: true, message: "update successfully" });
    }
    await blog.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
      },
    });
    return res.json({ success: true, message: "update successfully" });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Blog: any = await blog.findById(req.params.id);
    fs.unlink(
      path.join(__dirname, `../public/uploads/${Blog.image}`),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    await blog.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "delete successfully" });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const createPatientInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { disease, subDisease, link } = req.body;
    const subDiseaseSplit = subDisease.split(",");
    const linkSplit = link.split(",");
    const sublink: any = [];
    subDiseaseSplit.map((i: any, index: number) => {
      sublink.push({
        name: i,
        link: linkSplit[index],
      });
    });
    const patientInformation = await patientInfo.create({
      disease,
      sublink,
    });
    res.json({ success: true, patientInformation });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};
const getPatientInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientInformation = await patientInfo.find({});
    res.json({ success: true, patientInformation });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const updatePatientInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { disease, subDisease, link } = req.body;
    const subDiseaseSplit = subDisease.split(",");
    const linkSplit = link.split(",");
    const sublink: any = [];
    subDiseaseSplit.map((i: any, index: number) => {
      sublink.push({
        name: i,
        link: linkSplit[index],
      });
    });
    const patientInformation = await patientInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          disease,
          sublink,
        },
      }
    );
    res.json({ success: true, message: "update successfully" });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const deletePatientInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientInformation = await patientInfo.findByIdAndDelete(
      req.params.id
    );
    res.json({ success: true, message: "delete successfully" });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const createHealthInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { disease, subDisease, link } = req.body;
    const subDiseaseSplit = subDisease.split(",");
    const linkSplit = link.split(",");
    const sublink: any = [];
    subDiseaseSplit.map((i: any, index: number) => {
      sublink.push({
        name: i,
        link: linkSplit[index],
      });
    });
    const patientInformation = await healthInfo.create({
      diseaseName: disease,
      sublink,
    });
    res.json({ success: true, patientInformation });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const getHealthInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const healthInformation = await healthInfo.find({}).sort({ disease: 1 });
    res.json({ success: true, healthInformation });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const updateHealthInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { disease, subDisease, link } = req.body;
    const subDiseaseSplit = subDisease.split(",");
    const linkSplit = link.split(",");
    const sublink: any = [];
    subDiseaseSplit.map((i: any, index: number) => {
      sublink.push({
        name: i,
        link: linkSplit[index],
      });
    });
    const patientInformation = await healthInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          diseaseName: disease,
          sublink,
        },
      }
    );
    res.json({ success: true, message: "update successfully" });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const deleteHealthInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientInformation = await healthInfo.findByIdAndDelete(
      req.params.id
    );
    res.json({ success: true, message: "delete successfully" });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

const sendEmail = (req: Request, res: Response) => {
  const { email, message, mobile, disease, name } = req.body;
  if (!email || !message || !mobile || !disease || !name) {
    return res.json({ success: false, message: "please include all fields" });
  }
  sendMail({ ...req.body });
  return res.json({ success: true, message: "mail was sent" });
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "please enter your mail" });
  }
  const isExist = await authModel.findOne({ email });
  if (!isExist) {
    return res.json({
      success: false,
      message: "email was not found check your email",
    });
  }
  const id: any = isExist._id;
  const token = generateToken(id);
  console.log(token);
  const link = `${req.protocol}://${req.get("host")}/forgotpassword/${token}`;
  sendMailForgot({
    email,
    link,
  });
  return res.json({ success: true, message: "mail was sent" });
};

const changeForgotPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  jwt.verify(req.params.token, JWT_KEY, async (err: any, decode: any) => {
    if (err) {
      return res.json({ success: false, err });
    }
    const info = await authModel.findById(decode.id);
    console.log(info);
    if (info?.isAdmin) {
      const hashPass = await hashPassword(password);
      await authModel.findByIdAndUpdate(decode.id, {
        $set: {
          password: hashPass,
        },
      });
      res.json({
        success: true,
        message: "password change successfully",
      });
    } else {
      return res.json({
        message: "you are not admin",
        success: false,
      });
    }
  });
};

export {
  register,
  login,
  isAdmin,
  createLive,
  getLive,
  createAppoitment,
  getAppoitment,
  deleteAppoitment,
  updateAppoitment,
  createDisease,
  getDisease,
  updateDisease,
  deleteDisease,
  createBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  createPatientInfo,
  getPatientInfo,
  updatePatientInfo,
  deletePatientInfo,
  createHealthInfo,
  getHealthInfo,
  updateHealthInfo,
  deleteHealthInfo,
  sendEmail,
  forgotPassword,
  changeForgotPassword,
};
