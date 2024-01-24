const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Blog = require("../models/BlogModel");
const Consult = require("../models/ConsultationModel");
const Dental = require("../models/DentalCare");
const DentalDoctor = require("../models/DentalDoctorModel");
const Doctor = require("../models/Doctor/DoctorModel");
const NetworkConsult = require("../models/Doctor/NetworkConsultModel");
const Equipment = require("../models/Equpments");
const EyeCare = require("../models/EyeCareModel");
const Institute = require("../models/InstitutionModel");
const Lead = require("../models/LeadModel");
const User = require("../models/UserModel");
const HomePage = require("../models/homepageModel");
const { homepage } = require("./Admin/AdminController");


exports.addBlog = CatchAsyncErrors(async (req, res, next) => {
  try {
    const currentDate = new Date();

    // Extract day, month, and year components
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = String(currentDate.getFullYear()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    const info = {
      content: req.body.content,
      heading: req.body.heading,
      date: formattedDate,
    };
    const blog = await new Blog(info).save();
    const home = await HomePage.findOne();
    home.blogs.push(blog?._id);
    await home.save();
    res.status(201).json({
      blog: blog,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});
exports.changeStatusPost = CatchAsyncErrors(async (req, res, next) => {
  try {
    const home = await HomePage.findOne();
    const index = home.posts.findIndex((i) => i.uid === req.params.id);

    home.posts[index].shown = !home.posts[index].shown ;
    await home.save();
    const homepage = await HomePage.findOneAndUpdate(home);

    res.status(200).json({
      success: true,
      home: homepage,
    });
  } catch (error) {
    res.json({
      error,
    });
    console.log(error);
  }
});
exports.uploadPlans = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const dental = await Dental.findOne();
    if(req.body){
      dental.plans.push(req.body);
      await dental.save();
      res.status(201).json({
        success:true,
        dental:dental
      })
    }
  else{
    res.status(404).json({
      error:"Not data found"
    })
  }
  } catch (error) {
    res.json({
      error
    })
  }
})
exports.deletePlans = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const dental = await Dental.findOne();
    const data = dental.plans.filter((i)=> i.id !== req.params.id);
    dental.plans = data
    await dental.save();
    res.status(201).json({
      dental,
      message:"Dental Plan & Package deleted Successfully"
    })
  } catch (error) {
    res.json({
      error
    })
  }
})
exports.changeStatusBlogs= CatchAsyncErrors(async (req, res, next) => {
  try {
const blog = await Blog.findById(req.params.id);
blog.shown = !blog.shown;
await blog.save()

    res.status(200).json({
      success: true,
      home: blog,
    });
  } catch (error) {
    res.json({
      error,
    });
    console.log(error);
  }
});
exports.updateDentalDoctor = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const doctor = await DentalDoctor.findById(req.params.id);
    doctor.status = req.body.status;
    await doctor.save();

    res.status(200).json({
      doctor,
      success:true,
      message:"Doctor Status Successfully"
    })

  } catch (error) {
    console.log(error);
    res.json({
      error
    })
  }
})
exports.shownDentalDoctor = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const doctor = await DentalDoctor.findById(req.params.id);
    doctor.shown = !doctor.shown;
    
    await doctor.save();

    res.status(200).json({
      doctor,
      success:true,
      message:"Doctor Status Successfully"
    })

  } catch (error) {
    console.log(error);
    res.json({
      error
    })
  }
})
exports.uploadEyePlan = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const eye = await EyeCare.findOne();
    if(req.body){
      eye.plans.push(req.body);
      await eye.save();
      res.status(201).json({
        success:true,
        eye:eye
      })
    }
  else{
    res.status(404).json({
      error:"Not data found"
    })
  }
  } catch (error) {
    res.json({
      error
    })
  }
})
exports.updatePremiumPrice = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const filter = { _id: req.params.id };

    // Using the filter object in findOneAndUpdate
    const doctor = await Doctor.findOneAndUpdate(filter, req.body, { new: true });

    res.status(200).json({
      message: "Price Added Successfully",
      doctor
    });
  } catch (error) {
    console.log(error);
    res.json({
      error
    })
  }
})
exports.getAllConsultation = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const consultation = await Consult.find().populate("doctor").populate("patient").populate("prescription");
    res.status(200).json({
      consultation
    })
  } catch (error) {
    res.json({
      error
    })
  }
})
//  leads
exports.getLeads = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const lead = await Lead.find();
    const homepage = lead?.filter((i)=>i.role === "homepage");
  
    const provider = lead?.filter((i)=>i.role === "provider");
    const ivf = lead?.filter((i)=>i.role === "ivf");
    const product = lead?.filter((i)=>i.role === "Product");

    res.status(200).json({
      homepage,provider,ivf,product
    })

  } catch (error) {
    
  }
})
exports.getAllPatient = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const patient = await User.find().populate("consultation");
    res.status(200).json({
      patient
    })
  } catch (error) {
    res.json({
      error
    })
  }
})
exports.updateEquipmentStatus = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const equipment = await Equipment.findById(req.params.id);
    equipment.shown = !equipment.shown;
    await equipment.save();
    res.status(200).json({
   equipment,
   message:"Equipment Status Updated Successfully"
    })
  } catch (error) {
    
  }
})
// Upload Equipment Review

exports.AddDentalEquipmentReview = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const dental = await Dental.findOne();
    dental.equipmentReviews.push(req.body);
    await dental.save();
    res.status(201).json({
      message:"Review Uploaded Succesfully",
      dental
    })
    
  } catch (error) {
    res.json({
      error
    })
  }
})
exports.getInstitution = CatchAsyncErrors(async(req,res,next)=>{
const institute = await Institute.find();
res.status(200).json({
  institute
})
})


exports.getNetworkConsultation = CatchAsyncErrors(async(req,res,next)=>{
  try {
    const consultation = await NetworkConsult.find().populate("institute").populate("patient").populate("prescription")
    res.status(200).json({
      consultation
    })
  } catch (error) {
    
  }
})