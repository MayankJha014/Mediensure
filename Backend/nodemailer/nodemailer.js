const nodemailer = require("nodemailer");
const errorHanler = require("../error/errorHandler");

exports.sendmail = (req,res,next,otp)=>{

const transport  = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    post:465,
    auth:{
        user:process.env.NODE_MAIL,
        pass:process.env.MAIL_PASS
    }
})
const mailoption = {
    from:"Garvit Jain pvt.lmtd",
    to:req.body.email,
    subject :"Password Reset Link ",
    // text:"Click the below link",
    html:`
    <h1>This is your one time password .</h1> <br/>
    <h3>${otp}</h3>
    `

}
transport.sendMail(mailoption,(err,info)=>{
 

    if(err) {return next(new errorHanler(err,500))}
else{
     return res.status(200).json({
        message:"Mail send successfully",
        otp
    })
}

})
}
exports.sendmailDoctorPassword = (req,res,next,password,email)=>{

    const transport  = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        post:465,
        auth:{
            user:process.env.NODE_MAIL,
            pass:process.env.MAIL_PASS
        }
    })
    const mailoption = {
        from:"Garvit Jain pvt.lmtd",
        to:email,
        subject :"Password Reset Link ",
        // text:"Click the below link",
        html:`
        <h1>This is your one time password .</h1> <br/>
        <h3>${password}</h3>
        <a href=${process.env.ADMIN_URL} >CLICK THIS LINK TO LOGIN YOUR DASHBOARD</a>
        `
    
    }
    transport.sendMail(mailoption,(err,info)=>{
     
    
        if(err) {return next(new errorHanler(err,500))}
    else{
         return res.status(200).json({
            message:"Mail send successfully",
            password
        })
    }
    
    })
    }