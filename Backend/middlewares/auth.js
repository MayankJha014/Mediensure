const jwt = require("jsonwebtoken")
const errorHanler = require("../error/errorHandler")
const { CatchAsyncErrors } = require("./CatchAsyncerror");
const { default: axios } = require("axios");
// const { token } = require("morgan");

// const jwt = require('jsonwebtoken');

const API_KEY = "471a91aa-bae5-4c4c-9ed9-2719d74935df";
const SECRET = "8d90a2ebd429e78844cd47c062b7c9831f4f5eaa44d5b7b92de97865526c5326";




exports.isAuthenticated = CatchAsyncErrors(async (req,res,next)=>{
    
   const { patientToken } = req.cookies;

    if(!patientToken){
        return next(
            new errorHanler("Please login to access",401)
        )
    }
    const { id } = jwt.verify(patientToken,process.env.JWT_SECRET);
    req.id = id
    
    next();
})

exports.isAuthenticatedAdmin = CatchAsyncErrors(async (req,res,next)=>{
   const {adminToken} = req.cookies
    if(!adminToken){
        return next(
            new errorHanler("admin Please login to access",401)
        )
    }
    // console.log(req);
    const { id } = jwt.verify(adminToken,process.env.JWT_SECRET);
    req.id = id
    
    next();
})
exports.isAuthenticatedDoctor = CatchAsyncErrors(async (req,res,next)=>{
    const {doctorToken} = req.cookies
     if(!doctorToken){
         return next(
             new errorHanler("doctor Please login to access",401)
         )
     }
     // console.log(req);
     const { id } = jwt.verify(doctorToken,process.env.JWT_SECRET);
     req.id = id
     
     next();
 })
 exports.isAuthenticatedOperation = CatchAsyncErrors(async (req,res,next)=>{
    const {operationToken} = req.cookies
     if(!operationToken){
         return next(
             new errorHanler("operation Please login to access",401)
         )
     }
     // console.log(req);
     const { id } = jwt.verify(operationToken,process.env.JWT_SECRET);
     req.id = id
     
     next();
 })
exports.videSdk = (req,res,next)=> {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
  
    const options = { expiresIn: "10m", algorithm: "HS256" };
  
    const payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    };
  
    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token });
}

exports.meetingroom = async(req,res,next)=>{
    const { token, region } = req.body;
    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ region }),
    };
  
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => res.json(result)) // result will contain meetingId
      .catch((error) => console.error("error", error));
}