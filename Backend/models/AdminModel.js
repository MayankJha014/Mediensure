const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [3, "First Name should must conatin atleat 3 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      minLength: [4, "Last Name should must conatin atleat 4 characters"],
    },

    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "https://static.vecteezy.com/system/resources/previews/004/991/321/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg",
      },
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
    contact: {
      type: String,
    },
    language: {
      type: Array,
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
    consultationFees : {
     type:Number,
     default:10
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain atleast 6 character"],
    },
    bannerImage: {
      filename: String,
      mimetype: String,
    },
    healthTips: [],
    comapny: [],
    
    resetpasswordToken: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

AdminModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
AdminModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
AdminModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
};
const Admin = mongoose.model("Admin", AdminModel);
module.exports = Admin;
