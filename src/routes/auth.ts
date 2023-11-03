import express from "express";
import {
  register,
  login,
  isAdmin,
  createLive,
  getLive,
  createAppoitment,
  getAppoitment,
  deleteAppoitment,
  updateAppoitment,
  sendEmail,
  createDisease,
  getDisease,
  deleteDisease,
  updateDisease,
  createBlog,
  getBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  createPatientInfo,
  forgotPassword,
  changeForgotPassword,
  getPatientInfo,
  deletePatientInfo,
  updatePatientInfo,
  createHealthInfo,
  deleteHealthInfo,
  updateHealthInfo,
  getHealthInfo,
} from "../controlers/auth";
import authenticate from "../midlewares/authenticate";
import uploadImage from "../helpers/multer";

const router = express.Router();

router.route("/isadmin").get(authenticate, isAdmin);
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/live/create").post(uploadImage.single("img"), createLive);
router.route("/live").get(getLive);

router.route("/appoitment/create").post(authenticate, createAppoitment);
router.route("/appoitment").get(getAppoitment);
router.route("/appoitment/update/:id").put(authenticate, updateAppoitment);
router.route("/appoitment/delete/:id").delete(authenticate, deleteAppoitment);

router.route("/disease/create").post(authenticate, createDisease);
router.route("/disease/get").get(getDisease);
router.route("/disease/update/:id").put(updateDisease);
router.route("/disease/delete/:id").delete(deleteDisease);

router.route("/blog/create").post(authenticate, createBlog);

router.route("/blog/get").get(getBlog);
router.route("/blog/get/:id").get(getSingleBlog);

router.route("/blog/delete/:id").delete(authenticate, deleteBlog);
router.route("/blog/update/:id").put(authenticate, updateBlog);

router.route("/forgotpassword").post(forgotPassword);
router.route("/changeforgotpassword/:token").post(changeForgotPassword);

router.route("/patientinfo/create").post(authenticate, createPatientInfo);
router.route("/patientinfo/get").get(getPatientInfo);
router.route("/patientinfo/delete/:id").delete(deletePatientInfo);
router.route("/patientinfo/update/:id").put(updatePatientInfo);

router.route("/healthinfo/create").post(authenticate, createHealthInfo);
router.route("/healthinfo/get").get(getHealthInfo);
router.route("/healthinfo/delete/:id").delete(deleteHealthInfo);
router.route("/healthinfo/update/:id").put(updateHealthInfo);

router.route("/sendemail").post(sendEmail);

export default router;
