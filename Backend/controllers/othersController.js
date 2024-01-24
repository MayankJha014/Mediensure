const Lead = require("../models/LeadModel");

// const { io } = require("../app");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Dental = require("../models/DentalCare");
const DentalDoctor = require("../models/DentalDoctorModel");
const Doctor = require("../models/Doctor/DoctorModel");
const Equipment = require("../models/Equpments");
const EyeCare = require("../models/EyeCareModel");
const HomePage = require("../models/homepageModel");
const Prescription = require("../models/Prescription");
const Admin = require("../models/AdminModel");
const Blog = require("../models/BlogModel");

exports.getHomepage = CatchAsyncErrors(async (req, res, next) => {
  try {
    const homepage = await HomePage.findOne().populate("blogs");
    res.status(200).json({
      homepage,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getDental = CatchAsyncErrors(async (req, res, next) => {
  try {
    const dental = await Dental.findOne();
    res.status(200).json({
      dental: dental,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getDentalDoctor = CatchAsyncErrors(async (req, res, next) => {
  try {
    const dental = await DentalDoctor.find({ doctorType: "Dental" });
    res.status(200).json({
      dental: dental,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getDentalEquipment = CatchAsyncErrors(async (req, res, next) => {
  try {
    const equipment = await Equipment.find({ type: "Dental" });
    res.status(200).json({
      equipment: equipment,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getEyeCare = CatchAsyncErrors(async (req, res, next) => {
  try {
    const eye = await EyeCare.findOne();
    res.status(200).json({
      eye: eye,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getEyeDoctor = CatchAsyncErrors(async (req, res, next) => {
  try {
    const eye = await DentalDoctor.find({ doctorType: "Eye" });
    res.status(200).json({
      eye: eye,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getEyeEquipment = CatchAsyncErrors(async (req, res, next) => {
  try {
    const equipment = await Equipment.find({ type: "Eye" });
    res.status(200).json({
      equipment: equipment,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getAllDoctors = CatchAsyncErrors(async (req, res, next) => {
  try {
    const doctor = await Doctor.find();
   const percentage = await Admin.findOne().select("consultationFees")
    res.status(200).json({
      doctor,
      percentage:percentage
    });
  } catch (error) {
    res.json({
      error,
    });
    console.log(error);
  }
});
// CREATE LOAD
exports.createLead = CatchAsyncErrors(async (req, res, next) => {
  try {
    const lead = await new Lead(req.body).save();
    res.status(201).json({
      meaage: "Lead Created Successfully",
      lead,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
//  get product
exports.getProductId = CatchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Equipment.findById(req.params.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

// get prescription
exports.getPrescriptionDetails = CatchAsyncErrors(async (req, res, next) => {
  const prescription = await Prescription.findById(req.params.id).populate({
    path: "consultation",
    populate: [
      { path: "doctor", model: "Doctor", select: "firstname lastname number " },
      { path: "patient", model: "User", select: "name age phone " }
    ],
  });
  res.status(200).json({
    prescription,
  });
});


exports.getBlog = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      blog
    })
  } catch (error) {
    res.json({
      error
    })
  }
})
exports.getPost = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const homepage = await HomePage.findOne();
      var post = homepage.posts.find((i)=>i.uid === req.params.id)
    res.status(200).json({
      post
    })
  } catch (error) {
    res.json({
      error
    })
  }
})