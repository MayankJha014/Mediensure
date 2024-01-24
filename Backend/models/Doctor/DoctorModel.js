const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DoctorModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      //   required: [true, "First Name is required"],
      //   minLength: [3, "First Name should must conatin atleat 3 characters"],
    },
    lastname: {
      type: String,
      //   required: [true, "Last Name is required"],
      //   minLength: [4, "Last Name should must conatin atleat 4 characters"],
    },
    img: {
      type: Object,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    language: {
      type: Array,
    },
    status: {
      type: String,
      default: "Today",
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    fees: {
      type: String,
    },
    type: {
      type: Array,
      default:[]
    },
    registrationNumber: {
      type: String,
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      //   minLength: [6, "Password must contain atleast 6 character"],
    },
    number: {
      type: Number,
    },
    experience: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    premium: {
      type: Number,
      default: 0,
    },
    notifications: [
      {
        message: String,
        isShown: {
          type: Boolean,
          default: true,
        },
        date: {
          type: String,
        },
      },
    ],
    consultation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consult",
      },
    ],
    resetpasswordToken: {
      type: String,
      default: "0",
    },
    form:{
      type:Boolean,
      default:false
    },
    pinCode:{
      type:String,
      default:"520"
    }
  },
  { timestamps: true }
);

DoctorModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
DoctorModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
DoctorModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
};
const Doctor = mongoose.model("Doctor", DoctorModel);
module.exports = Doctor;
