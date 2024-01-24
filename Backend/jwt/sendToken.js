const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");

exports. sendToken = (student,statusCode,res)=>{
    const token = student.getjwttoken();
    const options = {
        expires :new Date(Date.now() + 1*24*60*60*1000),
        httpOnly:true
    }
    res.status(statusCode).cookie("patientToken",token,options)
    .json({success:true,id:student._id,token});
    res.json({token})
}

exports.sendAdminToken = (admin,statusCode,res)=>{
    const token = admin.getjwttoken();
    const options = {
        expires :new Date(Date.now() + 1*24*60*60*1000),
        httpOnly:true
    }
    // console.log(admin);
    res.status(statusCode).cookie("adminToken",token,options)
    .json({success:true,id:admin._id,token});
    res.json({token})
}
exports.sendDoctorToken = (doctor,statusCode,res)=>{
    const token = doctor.getjwttoken(); 
    // console.log(doctor);
    const options = {
        expires :new Date(Date.now() + 1*24*60*60*1000),
        httpOnly:true
    }
    res.status(statusCode).cookie("doctorToken",token,options)
    .json({success:true,id:doctor._id,token});
    res.json({token})
}
exports.sendOperationToken = (operation,statusCode,res)=>{
    const token = operation.getjwttoken();
    const options = {
        expires :new Date(Date.now() + 1*24*60*60*1000),
        httpOnly:true
    }
    // console.log(operation);
    res.status(statusCode).cookie("operationToken",token,options)
    .json({success:true,id:operation._id,token});
    res.json({token})
}