const errorHanler = require("../../error/errorHandler");
const { sendAdminToken, sendOperationToken } = require("../../jwt/sendToken");
const { CatchAsyncErrors } = require("../../middlewares/CatchAsyncerror");
const Admin = require("../../models/AdminModel");

const imagekit = require("../../middlewares/imagekit.js").initimagekit();
const path = require("path");
const { sendmail, sendmailDoctorPassword } = require("../../nodemailer/nodemailer");
const student = require("../../models/studentModel");
const HomePage = require("../../models/homepageModel.js");
const Doctor = require("../../models/Doctor/DoctorModel.js");
const Dental = require("../../models/DentalCare.js");
const EyeCare = require("../../models/EyeCareModel.js");
const otpGenerator = require('otp-generator');
const Operator = require("../../models/OperatorModel.js");
exports.homepage = CatchAsyncErrors(async (req, res, next) => {
  //   const AdminData = await Admin.find().exec();

  res.json({ message: "This is Admin Data" });
});
exports.login = CatchAsyncErrors(async (req, res, next) => {
  const admin = await new Admin(req.body).save();
  //    res.status(201).json(studentModel)
  const home = await new HomePage().save();
  const dental = await new Dental().save();
  const eye = await new EyeCare().save();
  sendAdminToken(admin, 200, res);
});
exports.login = CatchAsyncErrors(async (req, res, next) => {
  const admin = await new Admin(req.body).save();
  //    res.status(201).json(studentModel)
  const home = await new HomePage().save();
  const dental = await new Dental().save();
  const eye = await new EyeCare().save();
  sendAdminToken(admin, 200, res);
});
exports.registerOperator = CatchAsyncErrors(async (req, res, next) => {
  const admin = await new Operator(req.body).save();

  sendOperationToken(admin, 200, res);
});
exports.AdminData = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await Admin.findById(req.id).exec();
  res.json(studentModel);
});
exports.operatorData = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await Operator.findById(req.id).exec();
  res.json(studentModel);
});
exports.signin = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await Admin.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!studentModel) return next(new errorHanler("User not found", 500));
  const isMatch = studentModel.comparepassword(req.body.password);

  if (!isMatch) return next(new errorHanler("Wrong password", 500));

  sendAdminToken(studentModel, 201, res);
});
exports.Operatorsignin = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await Operator.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!studentModel) return next(new errorHanler("User not found", 500));
  const isMatch = studentModel.comparepassword(req.body.password);

  if (!isMatch) return next(new errorHanler("Wrong password", 500));
  if(!studentModel.verfiy) return next(new errorHanler("You are not verified by admin"))
  sendAdminToken(studentModel, 201, res);
});


exports.OperatorDetails = CatchAsyncErrors(async(req,res,next)=>{
try {
  const operator = await Operator.find();
  res.status(200).json({
    operator:operator
  })
} catch (error) {
  res.json({
    error
  })
  
}
})
exports.UpdateOperatorDetails = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const operator = await Operator.findById(req.params.id);
    operator.verfiy = !operator.verfiy
      await operator.save()
    res.status(200).json({
      operator:operator,
      message:"Operator Status Updated Successfullly"
    })
  } catch (error) {
    res.json({
      error
    })
    
  }
  })

exports.signout = CatchAsyncErrors(async (req, res, next) => {
  res.clearCookie("adminToken");
  res.json({ message: "Sign Out" });
});
exports.sendMail = CatchAsyncErrors(async (req, res, next) => {
  const AdminData = await Admin.findOne({ email: req.body.email }).exec();
  console.log(AdminData);
  if (!AdminData) {
    return next(new errorHanler("User with this email does not exist ", 404));
  }
  const url = `http://localhost:3000/Admin/forgetlink/${AdminData._id}`;
  AdminData.resetpasswordToken = "1";
  AdminData.save();
  console.log(AdminData.resetpasswordToken);

  sendmail(req, res, next, url);
  res.json({ AdminData, url });
});
exports.changePassword = CatchAsyncErrors(async (req, res, next) => {
  const AdminData = await Admin.findById({ _id: req.params.id }).exec();

  if (!AdminData) {
    next(new errorHanler("User not exist"), 500);
  }

  if (AdminData.resetpasswordToken === "1") {
    AdminData.password = req.body.password;
    AdminData.resetpasswordToken = "0";
    AdminData.save();

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
  const AdminData = await Admin.findById({ _id: req.id }).select("+password");
  const isMatch = AdminData.comparepassword(req.body.oldpassword);
  console.log(AdminData);
  if (!isMatch) return next(new errorHanler("Wrong password", 500));
  if (isMatch) {
    AdminData.password = req.body.newpassword;
    await AdminData.save();
    sendAdminToken(AdminData, 201, res);
  }
  res.status(200).json({ message: "Password is changed succesfully" });
});
exports.UpdateData = CatchAsyncErrors(async (req, res, next) => {
  console.log("hello");
  const AdminData = await Admin.findByIdAndUpdate(req.id, req.body).exec();

  res.status(200).json({ message: "Student updated successfully" });
});
exports.avatarupload = CatchAsyncErrors(async (req, res, next) => {
  const AdminData = await Admin.findById(req.id).exec();

  const file = req.files.avatar;
  const modifiedFileName = `Admingarvitjain-${Date.now()}${path.extname(
    file.name
  )}`;
  if (AdminData.avatar.fileId !== "") {
    await imagekit.deleteFile(AdminData.avatar.fileId);
  }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  AdminData.avatar = { fileId, url };
  await AdminData.save();
  res.json({ message: "Profile Image uploaded" });
});
exports.getAllStudent = CatchAsyncErrors(async (req, res, next) => {
  const studentData = await student.find().exec();
  res.status(200).json({
    message: "Get all students Data",
    student: studentData,
  });
});

exports.getImage = CatchAsyncErrors(async (req, res, next) => {
  try {
  } catch (error) {
    res.json({
      error,
    });
  }
});

exports.verifyDoctor = CatchAsyncErrors(async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select("+password")
      .exec();
    doctor.isVerified = !doctor?.isVerified;

    if(doctor.form === true && doctor.isVerified === true){
      var  generatedPassword = doctor.firstname + otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
      doctor.password = generatedPassword;
      sendmailDoctorPassword(req,res,next,generatedPassword,doctor.email)
      doctor.form = false
    }
    await doctor.save();
    res.status(200).json({
      doctor,
      message: "Doctor status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});
exports.updateConsultationFees = CatchAsyncErrors(async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.id);
    admin.consultationFees = req.body.consultationFees;
    await admin.save();
    res.status(200).json({
      message: "Consulation Fees Percentage updated successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
