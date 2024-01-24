const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    age:{
     type:String
    },
    consultation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consult",
      },
    ],
    offlineconsultation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NetworkConsult",
      },
    ],
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain atleast 6 character"],
    },
  },
  {
    timestamp: true,
  }
);
userModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
userModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
};
const User = mongoose.model("User", userModel);
module.exports = User;
