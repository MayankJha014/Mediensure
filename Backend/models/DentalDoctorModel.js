const mongoose = require("mongoose");
const DentalDoctorModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Doctor Name is required"],
  },
  type: {
    type: String,
    required: [true, "Doctor Type is required"],
  },
  language: {
    type: Array,
    default: [],
  },
  price: {
    type: String,
  },
  img: {
    type: Object,
  },
  status:{
    type:String,
    default:"Today"
  },
  is_Available:{
    type:Boolean,
    default:false
  },
  shown:{
    type:Boolean,
    default:false
  },
  expierence:{
    type:Number,
    default:1
  },
  doctorType:{
    type:String
  }
});

const DentalDoctor = mongoose.model("DentalDoctor", DentalDoctorModel);
module.exports = DentalDoctor;
