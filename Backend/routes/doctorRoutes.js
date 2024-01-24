const express = require("express");
const {
  sendOtp,
  verify,
  registerDoctor,
  doctorCheck,
  loginDoctor,
  logout,
  updateDoctorStatus,
  getAllDoctorNotification,
  notificationSeen,
  getDoctorAppointment,
  submitPrescription,
  sendEmailOtp,
  verifyEmailOtp,
  registerDoctorForm,
  registerInstitution,
  registerAllInstitution,
  consultationChange,
} = require("../controllers/Doctor/doctorAuthController");
const { isAuthenticatedDoctor } = require("../middlewares/auth");
const mongoose = require("mongoose");
const router = express.Router();
var multer = require("multer");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Doctor = require("../models/Doctor/DoctorModel");
const crypto = require("crypto");
const otpGenerator = require('otp-generator')

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
const conn = mongoose.connection;
var gfsBucket;

conn.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "avatar", // Change to your desired bucket name
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image"); // Using single instead of array
const { Readable } = require("stream");

router.get("/doctor", isAuthenticatedDoctor, doctorCheck);
router.post("/login", loginDoctor);
router.post("/logout", isAuthenticatedDoctor, logout);
router.post("/register/form/institution", registerInstitution);
router.post("/register/form/all/institution", registerAllInstitution);
router.post("/send/otp", sendOtp);
router.post("/email/otp", sendEmailOtp);
router.post("/verify/otp", verify);
router.post("/verify/email/otp", verifyEmailOtp);
router.post("/register", registerDoctor);
router.post(
  "/register/form",
  CatchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    const imageFile = req?.files?.image;

    const imageRandomName = crypto.randomBytes(20).toString("hex");
    const imageStream = Readable.from(imageFile.data);
    const imageUploadStream = await gfsBucket.openUploadStream(imageRandomName);
    imageStream.pipe(imageUploadStream);
   var img = {
      filename: imageRandomName,
      mimetype: imageFile?.mimetype,
      _id: imageUploadStream.id,
    };
    const info = {
      ...req.body,
      img,
      password:
        req.body.firstname +
        otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        }),
      form: true,
    };
    const doctor = await new Doctor(info).save();
    res.status(200).json({
      message: "Form submited successfully",
    });
  })
);
router.post(
  "/upload/doctor",
  isAuthenticatedDoctor,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      var img;
      const d = await Doctor.findById(req.id);

      if (req?.files) {
        const imageFile = req?.files?.image;

        const imageRandomName = crypto.randomBytes(20).toString("hex");
        const imageStream = Readable.from(imageFile.data);
        const imageUploadStream = await gfsBucket.openUploadStream(
          imageRandomName
        );
        imageStream.pipe(imageUploadStream);
        img = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
      }
      if (img && d?.img) {
        gfsBucket.delete(d?.img?._id, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err });
          }
        });
      }

      req.body.language = JSON.parse(req.body.language);
      req.body.type = JSON.parse(req.body.type);

      const info = {
        ...req.body,
        img,
      };
      // console.log(info);
      const doctor = await Doctor.findByIdAndUpdate(req.id, info);
      res.status(200).json({
        doctor,
        message: "Updated Successfullt",
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  })
);

router.get("/update/doctor/status", isAuthenticatedDoctor, updateDoctorStatus);
router.get(
  "/get/all/notification",
  isAuthenticatedDoctor,
  getAllDoctorNotification
);
router.get("/notification/seen", isAuthenticatedDoctor, notificationSeen);
router.get(
  "/get/consultation/appoint",
  isAuthenticatedDoctor,
  getDoctorAppointment
);
router.post(
  "/submit/prescription/:id",
  isAuthenticatedDoctor,
  submitPrescription
);
router.get("/connected/:id",consultationChange)
module.exports = router;
