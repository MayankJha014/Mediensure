"use client";
import {
  VerifyDoctor,
  VerifyEmailDoctor,
  registerDoctor,
  registerDoctorForm,
  sendEmailDoctor,
  sendOtpDoctor,
} from "@/store/Action/Authentication";
import {
  clearError,
  clearOtpEmail,
  clearmessage,
  clearmsg,
} from "@/store/Reducer/AdminReducer";
import { CircularProgress, TextField } from "@mui/material";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const page = () => {
  const [number, setnumber] = useState("");
  const [email, setemail] = useState("");
  const [otp, setotp] = useState(false);
  const [emailOtp, setemailOtp] = useState(false);
  const [emailOtpSuccess, setemailOtpSuccess] = useState(false);
  const [img, setImg] = useState("");
  const { message, loading, otpVerify, error, otpEmail, doctorForm, msg } =
    useSelector((state) => state.adminReducer);
  // console.log(loading,478);
  // const socket = io("http://localhost:8080/",{path:"/socket.io"});
  const dispatch = useDispatch();
  const handleVerifyNumber = () => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (number.match(phoneno)) {
      toast.success("Success");
      // dispatch(sendOtpDoctor())
      const info = {
        number: number,
      };
      dispatch(sendOtpDoctor(info));
    } else {
      toast.error("Please enter a valid phone number");
    }
  };

  const [mobileOtp, setmobileOtp] = useState(["", "", "", "", "", ""]);
  const [emailVerifyOtp, setemailVerifyOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
    }
  };
  const submitOtp = () => {
    const info = {
      number: number,
      otp: mobileOtp.join(""),
    };
    dispatch(VerifyDoctor(info));
  };
  const submitOtpEmail = () => {
    const info = {
      otp: emailVerifyOtp.join(""),
    };
    dispatch(VerifyEmailDoctor(info));
  };
  const handlemobileOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (/^[0-9]*$/.test(value) && index >= 0 && index < 6) {
      const newmobileOtp = [...mobileOtp];
      newmobileOtp[index] = value;
      setmobileOtp(newmobileOtp);
    }
  };
  const handleemailOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (/^[0-9]*$/.test(value) && index >= 0 && index < 6) {
      const newmobileOtp = [...emailVerifyOtp];
      newmobileOtp[index] = value;
      setemailVerifyOtp(newmobileOtp);
    }
  };
  const handleVerifyEmail = () => {
    var e =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(e)) {
      const info = {
        email: email,
      };
      dispatch(sendEmailDoctor(info));
    } else {
      toast.error("Enter a valid Email address");
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (message === "OTP sent successfully") {
      toast.success("Otp is sent successfully to your mobile number .");

      setotp(true);
      dispatch(clearmessage());
    }
    if (message === "Email OTP verified successfully") {
      toast.success(message);
      setemailOtp(false);
      dispatch(clearmessage());
    }
    if (message === "Mail send successfully") {
      toast.success("Otp is sent successfully to your email .");
      setemailOtp(true);
      dispatch(clearmessage());
    }
    if (otpVerify) {
      setotp(false);
    }
    if (error === "Incorrect OTP, email verification failed") {
      toast.error(error);
      dispatch(clearError());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (otpEmail) {
      setemailOtpSuccess(true);
      dispatch(clearOtpEmail());
    }
    if (doctorForm) {
      router.push("/form/doctorsuccess");
    }
    if (msg) {
      toast.error(msg);
      dispatch(clearmsg());
    }
  }, [message, otpVerify, loading, error, otpEmail, doctorForm, msg]);

  const formSubmit = (e) => {
    e.preventDefault();
    const t = e.target;
    // if (otpVerify === undefined || otpVerify === false) {
    //   return toast.error("Please Verify your phone number");
    // }
    // if (emailOtpSuccess === undefined || emailOtpSuccess === false) {
    //   return toast.error("Please Verify your email");
    // }
    // if (t.firstname.value === "" || t.lastname.value === "") {
    //   return toast.error("Please Fill all the details");
    // }
    const formData = new FormData();
    formData.append("image",e.target.image.files[0])
    formData.append("firstname",t.firstname.value,)
    formData.append("lastname",t.lastname.value,)
    formData.append("number",number)
    formData.append("email",email)
    formData.append("pinCode",t.pincode.value);
    // const info = {
    //   firstname: t.firstname.value,
    //   lastname: t.lastname.value,
    //   number: number,
    //   email: email,
    //   img: ,
    //   pinCode: t.pincode.value,
    // };

    dispatch(registerDoctorForm(formData));
  };
  return (
    <div className="w-full bg-[#afc8ad] flex flex-col gap-10 h-screen px-[24vh] scrollbar-track-red-300 scrollbar-thumb-green-400 py-5 relative overflow-y-auto">
      <form className="w-full flex flex-col gap-10 h-fit" onSubmit={formSubmit}>
        <div className="w-full shrink-0 h-[40vh] bg-white rounded-2xl relative overflow-hidden">
          <div className="w-full h-6 bg-[#88AB8E] "></div>
          <h1 className="text-5xl font-semibold mt-10 ml-5">
            Doctor's Registration form
          </h1>
          <h3 className="mt-10 ml-5 text-lg">
            All the information are required in this form to register a doctor .
          </h3>
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>First Name</h1>
          <TextField
            id="outlined-basic"
            name="firstname"
            className="w-1/2"
            placeholder="First Name"
            variant="standard"
          />
          <h1>Last Name</h1>
          <TextField
            id="outlined-basic"
            name="lastname"
            className="w-1/2"
            placeholder="First Name"
            variant="standard"
          />
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>PinCode</h1>
          <TextField
            id="outlined-basic"
            type="number"
            name="pincode"
            className="w-1/2"
            placeholder="Pincode"
            variant="standard"
          />
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <label className="label">
            <span className="label-text">Select Your Image</span>
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs"
            name="image"
          />
          <div className="flex flex-col gap-4 p-4 items-center justify-center">
            {img && (
              <img
                src={img}
                className="h-[45vh] w-[45vw] object-contain"
                alt="Selected Image"
              />
            )}
            <div className="flex gap-2">
              {img && (
                <>
                  <Button
                    type="dashed"
                    onClick={() => setImg("")}
                    className=" bg-red-500 hover:bg-red-600 "
                  >
                    Delete Image
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>Email</h1>
          <div className="flex items-center justify-start gap-5 w-full">
            <TextField
              id="outlined-basic"
              type="email"
              disabled={emailOtpSuccess ? true : false}
              value={email}
              onChange={(e) => {
                setemailOtp(false), setemail(e.target.value);
              }}
              className="w-1/2"
              placeholder="Email"
              variant="standard"
            />
            {email && (
              <Button
                onClick={handleVerifyEmail}
                type="link"
                disabled={emailOtpSuccess ? true : false}
              >
                {loading ? <CircularProgress /> : "Verify"}
              </Button>
            )}
          </div>
          {emailOtp && (
            <div className="flex flex-col w-fit items-start justify-start gap-5">
              <div className="flex w-fit gap-4">
                {emailVerifyOtp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    className="w-[3vw] h-[3vw] text-sm text-center border-2 border-black rounded-lg"
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleemailOtpChange(e, index)}
                  />
                ))}
              </div>

              <Button
                type="primary"
                onClick={submitOtpEmail}
                className="bg-blue-500"
              >
                Send Otp
              </Button>
            </div>
          )}
        </div>
        <div className="w-full bg-white shrink-0 gap-5 flex flex-col rounded-xl p-10">
          <h1>Phone</h1>

          <div className="flex  items-center justify-start gap-5 w-full">
            <TextField
              id="outlined-basic"
              type="number"
              value={number}
              disabled={otpVerify ? true : false}
              onChange={(e) => {
                setotp(false), setnumber(e.target.value);
              }}
              className="w-1/2"
              placeholder="Phone number"
              variant="standard"
            />
            {number && !otp && (
              <Button
                onClick={handleVerifyNumber}
                type="link"
                disabled={otpVerify ? true : false}
              >
                {loading ? <CircularProgress /> : "Verify"}
              </Button>
            )}
          </div>
          {otp && (
            <div className="flex flex-col w-fit items-start justify-start gap-5">
              <div className="flex w-fit gap-4">
                {mobileOtp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    className="w-[3vw] h-[3vw] text-sm text-center border-2 border-black rounded-lg"
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handlemobileOtpChange(e, index)}
                  />
                ))}
              </div>
              <Button
                type="primary"
                onClick={submitOtp}
                className="bg-blue-500"
              >
                Send Otp
              </Button>
            </div>
          )}
        </div>
        <button
          className="bg-blue-500 p-4 rounded-2xl w-fit text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
