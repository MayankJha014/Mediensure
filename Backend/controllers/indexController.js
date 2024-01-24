const errorHanler = require("../error/errorHandler");
const { sendToken } = require("../jwt/sendToken");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Consult = require("../models/ConsultationModel.js");
const Doctor = require("../models/Doctor/DoctorModel.js");
// const User = require("../models/UserModel")
const User = require("../models/UserModel.js");
const { sendmail } = require("../nodemailer/nodemailer");
const imagekit = require("../middlewares/imagekit").initimagekit();
const path = require("path");
const shortid = require("shortid");

exports.homepage = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.find().exec();

  res.json({ message: "This is User Data", user });
});
exports.login = CatchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const user = await new User(req.body).save();
  //    res.status(201).json user)
  sendToken(user, 200, res);
});
exports.studentData = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).exec();
  res.json(user);
});
exports.signin = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  console.log(user, req.body);
  if (!user) return next(new errorHanler("User not found", 500));
  const isMatch = user?.comparepassword(req.body.password);

  if (!isMatch) return next(new errorHanler("Wrong password", 500));

  sendToken(user, 201, res);
});
exports.signout = CatchAsyncErrors(async (req, res, next) => {
  res.clearCookie("patientToken");
  res.json({ message: "Sign Out" });
});
exports.sendMail = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await User.findOne({ email: req.body.email }).exec();
  console.log(studentData);
  if (!studentData) {
    return next(new errorHanler("User with this email does not exist ", 404));
  }
  const url = `http://localhost:3000/User/forgetlink/${studentData._id}`;
  studentData.resetpasswordToken = "1";
  studentData.save();
  console.log(studentData.resetpasswordToken);

  sendmail(req, res, next, url);
  res.json({ studentData, url });
});
exports.changePassword = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await User.findById({ _id: req.params.id }).exec();

  if (!studentData) {
    next(new errorHanler("User not exist"), 500);
  }

  if (studentData.resetpasswordToken === "1") {
    studentData.password = req.body.password;
    studentData.resetpasswordToken = "0";
    studentData.save();

    res.status(200).json({
      message: "Password Change Succesfully",
    });
  } else {
    res.status(400).json({
      message: "Link Expired",
    });
  }
});
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const studentData = await User.findById({ _id: req.id }).select("+password");
  const isMatch = studentData.comparepassword(req.body.oldpassword);
  console.log(studentData);
  if (!isMatch) return next(new errorHanler("Wrong password", 500));
  if (isMatch) {
    studentData.password = req.body.newpassword;
    await studentData.save();
    sendToken(studentData, 201, res);
  }
  res.status(200).json({ message: "Password is changed succesfully" });
});
exports.UpdateData = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await User.findByIdAndUpdate(req.id, req.body).exec();

  res.status(200).json({ message: "Student updated successfully" });
});
exports.avatarupload = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await User.findById(req.id).exec();

  const file = req.files.avatar;
  const modifiedFileName = `garvitjain-${Date.now()}${path.extname(file.name)}`;
  if (studentData.avatar.fileId !== "") {
    await imagekit.deleteFile(studentData.avatar.fileId);
  }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  studentData.avatar = { fileId, url };
  await studentData.save();
  res.json({ message: "Profile Image uploaded" });
});

// DOCTOR CONSULTATION
exports.bookConsultation = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { io } = require("../app.js");

    const user = await User.findById(req.id);
    if (!user) next(new errorHanler("User Not Found"));
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) next(new errorHanler("Doctor Not Found"));
    const info = {
      patient: user?._id,
      doctor: doctor._id,
      tele: shortid.generate(),
      ...req.body,
    };
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    doctor.notifications.push({
      message: `New consultation booked by ${user?.name}. Please check your consultations.`,
      isShown: true,
      date: formattedDate,
    });
    const consult = await new Consult(info).save();
    user.consultation.push(consult?._id);
    doctor.consultation.push(consult._id);
    await doctor.save();
    await user.save();
    const data = {
      message: `New consultation booked by ${user?.name}. Please check your notifications.`,
    };
    if (user) {
      io.on("connection", (socket) => {
        console.log("user");
      });
      io.emit("userconnect", data);
    }

    res.status(200).json({
      message: "Consultation Scheduled Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

exports.getPatientAllConsultation = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.id).populate({
      path: "consultation",
      populate: [
        { path: "doctor", model: "Doctor", select: "firstname lastname _id" },
        { path: "prescription", model: "Prescription", select: "_id" },
      ],
    });
    const consult = user?.consultation;
    res.status(200).json({
      consult,
    });
  } catch (error) {
    console.log(error);
  }
});
exports.getPatientOfflineAllConsultation = CatchAsyncErrors(
  async (req, res, next) => {
    try {
      const user = await User.findById(req.id).populate({
        path: "offlineconsultation",
        populate: [
          { path: "doctor", model: "Doctor", select: "firstname lastname _id" },
          { path: "prescription", model: "Prescription", select: "_id" },
        ],
      });
      const consult = user?.offlineconsultation;
      res.status(200).json({
        consult,
      });
    } catch (error) {
      console.log(error);
    }
  }
);
