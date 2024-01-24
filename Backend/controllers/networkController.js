const errorHanler = require("../error/errorHandler");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Network = require("../models/NetworkData");
const networkData = require("../models/NetworkData");
const shortid = require("shortid");
const User = require("../models/UserModel");
const NetworkConsult = require("../models/Doctor/NetworkConsultModel");
const Doctor = require("../models/Doctor/DoctorModel");
const Institute = require("../models/InstitutionModel");
exports.getDoctor = CatchAsyncErrors(async (req, res, next) => {
  try {
    const network = await Institute.find({
      $or: [
        { pinCode: req.params.pincode },
        { personName: req.params.personName },
      ],
    });
    res.status(200).json({
      network,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

exports.registerNetwork = CatchAsyncErrors(async (req, res, next) => {
  try {
    const network = await new Network(req.body).save();
    res.status(201).json({
      network,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

exports.bookNetworkConsultation = CatchAsyncErrors(async (req, res, next) => {
  try {
    const institute = await Institute.findById(req.params.id).exec();
    if (!institute) next(new errorHanler("Doctor not found"));
    const user = await User.findById(req.id);
    if (!user) next(new errorHanler("Please login to access the resources"));
    const info = {
      patient: user?._id,
      institute: institute._id,
      tele: shortid.generate(),
      ...req.body,
    };
    const networkConsult = await new NetworkConsult(info).save();
    user.offlineconsultation.push(networkConsult._id);
    await user.save()
    res.status(200).json({
      networkConsult,
      message:"Offline Consultation Sechduled successfully"
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

exports.updateNetwork = CatchAsyncErrors(async (req, res, next) => {
  try {
    if(req.body.status === "Resechdudled"){
      console.log(req.body);
      console.log(req.params.id);
      const network = await NetworkConsult.findByIdAndUpdate(req.params.id,req.body);
    
      console.log(network);
      res.status(200).json({
        message: "Consultation status updated successfully",
      });
    }
    else{
      const network = await NetworkConsult.findById(req.params.id);
      network.status = req.body.status;
    
      await network.save();
      res.status(200).json({
        message: "Consultation status updated successfully",
      });
    }
   
  } catch (error) {
    res.json({
      error
    })
  }
});
