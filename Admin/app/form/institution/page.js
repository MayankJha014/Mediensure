"use client";
import {
  VerifyDoctor,
  VerifyEmailDoctor,
  registerDoctor,
  registerDoctorForm,
  registerInstitutionForm,
  sendEmailDoctor,
  sendOtpDoctor,
} from "@/store/Action/Authentication";
import {
  clearError,
  clearOtpEmail,
  clearmessage,
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
  const { message, loading, otpVerify, error, otpEmail, doctorForm } =
    useSelector((state) => state.adminReducer);
  console.log(loading, 478);
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
  console.log(email,456);
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
    if (otpEmail) {
      setemailOtpSuccess(true);
      dispatch(clearOtpEmail());
    }
    if (doctorForm) {
      router.push("/form/institutesuccess");
    }
  }, [message, otpVerify, loading, error, otpEmail, doctorForm]);

  const formSubmit = (e) => {
    e.preventDefault();
    const t = e.target;
    if (emailOtpSuccess === undefined || emailOtpSuccess === false) {
      return toast.error("Please Verify your email");
    }
    if (
      t.institutionName.value === "" ||
      t.type.value === "" ||
      t.address.value === "" ||
      t.speciality.value === "" ||
      t.pernonNo.value === "" ||
      t.personName.value === ""
    ) {
      return toast.error("Please Fill all the details");
    }
    const info = {
      institutionName: t.institutionName.value,
      type: t.type.value,
      address: t.address.value,
      speciality: t.speciality.value,
      pernonNo: t.pernonNo.name,
      personName: t.personName.name,
      email: email,
    };

    dispatch(registerInstitutionForm(info));
  };
  return (
    <div className="w-full bg-[#afc8ad] flex flex-col gap-10 h-screen px-[24vh] scrollbar-track-red-300 scrollbar-thumb-green-400 py-5 relative overflow-y-auto">
      <form className="w-full flex flex-col gap-10 h-fit" onSubmit={formSubmit}>
        <div className="w-full shrink-0 h-[40vh] bg-white rounded-2xl relative overflow-hidden">
          <div className="w-full h-6 bg-[#88AB8E] "></div>
          <h1 className="text-5xl font-semibold mt-10 ml-5">
            Institution Registration form
          </h1>
          <h3 className="mt-10 ml-5 text-lg">
            All the information are required in this form to register a doctor .
          </h3>
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>Name of Institution</h1>
          <TextField
            id="outlined-basic"
            name="institutionName"
            className="w-1/2"
            placeholder="Name of institution"
            variant="standard"
          />
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>Type of Institution</h1>
          <TextField
            id="outlined-basic"
            name="type"
            className="w-1/2"
            placeholder="type of institution"
            variant="standard"
          />
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>Address</h1>
          <TextField
            id="outlined-basic"
            name="address"
            className="w-1/2"
            placeholder="address of institution"
            variant="standard"
          />
        </div>

        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>Type of specialities</h1>
          <TextField
            id="outlined-basic"
            name="speciality"
            className="w-1/2"
            placeholder="Type of specialities"
            variant="standard"
          />
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>Contact person Name</h1>
          <TextField
            id="outlined-basic"
            name="personName"
            className="w-1/2"
            placeholder="Contact person name"
            variant="standard"
          />
        </div>
        <div className="w-full shrink-0 bg-white gap-5 flex flex-col rounded-xl p-10">
          <h1>Contact person Number</h1>
          <TextField
            id="outlined-basic"
            name="pernonNo"
            className="w-1/2"
            placeholder="Contact person name"
            variant="standard"
          />
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
                setemail(e.target.value)
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
