const errorHanler = require("../../error/errorHandler");
const { sendDoctorToken } = require("../../jwt/sendToken");
const { CatchAsyncErrors } = require("../../middlewares/CatchAsyncerror");
const Consult = require("../../models/ConsultationModel");
const Doctor = require("../../models/Doctor/DoctorModel");
const Institute = require("../../models/InstitutionModel");
const Prescription = require("../../models/Prescription");
const instiData = require("../../networkd");
const { sendmail } = require("../../nodemailer/nodemailer");
const { sendMail } = require("../indexController");
const accountSid = process.env.TWILO_SID;
const authToken = process.env.TWILO_TOKEN;
const verifySid = process.env.TWILO_VERIFY;
const client = require("twilio")(accountSid, authToken);
const otpGenerator = require("otp-generator");
var otp = "";

exports.sendOtp = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { number } = req.body;

    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({
        to: `+91${number}`,
        channel: "sms",
      });

    console.log(verification.status);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: "Wrong Number Please Enter a Valid Number" });
  }
});
exports.sendEmailOtp = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    const url = "dsfdf";
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    sendmail(req, res, next, otp);
  } catch (error) {
    console.error(error);
    res.json({ error: "Wrong Number Please Enter a Valid Number" });
  }
});
exports.verifyEmailOtp = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { otp: userEnteredOtp } = req.body;

    if (!userEnteredOtp) {
      return res
        .status(400)
        .json({ error: "OTP is required in the request body" });
    }

    if (otp === userEnteredOtp) {
      // OTP verification successful
      res.status(200).json({ message: "Email OTP verified successfully" });
    } else {
      // Incorrect OTP
      res
        .status(400)
        .json({ error: "Incorrect OTP, email verification failed" });
    }
  } catch (error) {}
});
exports.verify = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { number, otp } = req.body;
    ``;
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: `+91${number}`,
        code: otp,
      });

    // Now you can check the verification status`
    if (verification_check.status === "approved") {
      res.status(200).json({ message: "OTP verified successfully" });
      // Proceed with additional actions, e.g., saving a doctor's information
    } else {
      res.status(400).json({ error: "OTP verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
exports.registerDoctor = CatchAsyncErrors(async (req, res, next) => {
  const doctor = await new Doctor(req.body).save();
  sendDoctorToken(doctor, 200, res);
});

exports.doctorCheck = CatchAsyncErrors(async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.id).exec();
    const { io } = require("../../app");

    // io.emit("userconnect", doctor);

    res.status(200).json(doctor);
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.loginDoctor = CatchAsyncErrors(async (req, res, next) => {
  try {
    console.log(req.body);
    const studentModel = await Doctor.findOne({ email: req.body.email })
      .select("+password")
      .exec();
    if (!studentModel) return next(new errorHanler("User not found", 500));
    const isMatch = studentModel.comparepassword(req.body.password);

    if (!isMatch) return next(new errorHanler("Wrong password", 500));

    sendDoctorToken(studentModel, 201, res);
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});
exports.logout = CatchAsyncErrors(async (req, res, next) => {
  try {
    res.clearCookie("doctorToken");
    res.json({ message: "Sign Out" });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.registerInstitution = CatchAsyncErrors(async (req, res, next) => {
  try {
    const institution = await new Institute(req.body).save();
    res.status(200).json({
      institution,
      message: "Institution Uploaded Successfully",
    });
  } catch (error) {}
});
exports.registerAllInstitution = CatchAsyncErrors(async (req, res, next) => {
  try {
    for (const e of instiData) {
      const institution = await new Institute(e).save();
      // Do something with the saved institution if neede
    }
    res.status(200).json({
      message: "Institution Uploaded Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

exports.updateDoctorStatus = CatchAsyncErrors(async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.id);
    doctor.isAvailable = !doctor.isAvailable;
    doctor.status = "Now";
    await doctor.save();
    res.status(200).json({
      doctor,
      message: "Doctor Status Chnaged Successfully",
    });
  } catch (error) {}
});
exports.getAllDoctorNotification = CatchAsyncErrors(async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.id);
    const filter = doctor?.notifications?.filter((i) => i?.isShown === true);
    res.status(200).json({
      notification: doctor?.notifications,
      number: filter?.length,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.notificationSeen = CatchAsyncErrors(async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.id);
    doctor.notifications.forEach((dets) => {
      dets.isShown = false;
    });
    await doctor.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {}
});
exports.getDoctorAppointment = CatchAsyncErrors(async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.id).populate({
      path: "consultation",

      populate: [
        { path: "patient", model: "User", select: "name" },
        { path: "prescription", model: "Prescription", select: "_id" },
      ],
    });
    const data = doctor?.consultation?.filter((i) => i?.isConsulted === false);
    res.status(200).json({
      appoint: data,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

exports.submitPrescription = CatchAsyncErrors(async (req, res, next) => {
  try {
    const consult = await Consult.findById(req.params.id);
    const info = {
      ...req.body,
      consultation: consult._id,
    };
    console.log(info);
    const prescription = await new Prescription(info).save();
    consult.prescription = prescription._id;
    await consult.save();
    res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.json({
      error,
      message: "Error in submiting prescription",
    });
  }
});
exports.consultationChange = CatchAsyncErrors(async (req, res, next) => {
  try {
    const consult = await Consult.findOne({ tele: req.params.id });
    consult.doctorJoin = true;
    await consult.save();
    res.status(200).json({
      message: "Doctor connected successfully",
    });
  } catch (error) {
    console.log(error);
  }
});
