const mongoose = require("mongoose");

const NetworkConsultationModel = mongoose.Schema({
   tele:{
    type:String,
    unique:true
   },
   institute:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Institute",
    required:true
   },
   patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   date:{
    type:String
   },
   time:{
    type:String
   },
   isConsulted:{
    type:Boolean,
    default:false
   },
   status:{
      type:String,
      default:"Scheduled",
   },
   prescription:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Prescription"
   }
},{timestamps:true})

const NetworkConsult = mongoose.model("NetworkConsult",NetworkConsultationModel);
module.exports = NetworkConsult;