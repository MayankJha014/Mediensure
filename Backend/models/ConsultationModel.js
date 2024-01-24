const mongoose = require("mongoose");

const ConsultationModel = mongoose.Schema({
   tele:{
    type:String,
    unique:true
   },
   doctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
    required:true
   },
   patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   fees:{
    type:Number,
    required:true
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
      default:"Sechduled",
      enum:["Sechduled","Ongoing","Completed"]
   },
   doctorJoin:{
     type:Boolean,
     default:false
   },
   prescription:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Prescription"
   }
},{timestamps:true})

const Consult = mongoose.model("Consult",ConsultationModel);
module.exports = Consult;