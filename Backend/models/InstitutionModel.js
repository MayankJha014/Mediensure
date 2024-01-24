const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const InstitutionModel = new mongoose.Schema(
  {
    institutionName: {
      type: String,
      unique:true
      //   required: [true, "First Name is required"],
      //   minLength: [3, "First Name should must conatin atleat 3 characters"],
    },
    type: {
      type: String,
      //   required: [true, "Last Name is required"],
      //   minLength: [4, "Last Name should must conatin atleat 4 characters"],
    },
    type: {
      type: String,
    },
    address:{
        type:String
        // required:true
    },
    speciality: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    specialities:{
        type:String
    },
    pernonNo:{
        type:String
    },
   personName:{
    type:String
   },
   pinCode:{
  type:Number
   },
   experience:{
    type:Number
     },
    resetpasswordToken: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const Institute = mongoose.model("Institute", InstitutionModel);
module.exports = Institute;
