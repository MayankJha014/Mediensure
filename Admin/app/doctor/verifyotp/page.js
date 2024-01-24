"use client";

import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import Link from "next/link";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
//   import {  getstudent, registerStudent } from "@/store/Action/action";
import { useRouter } from "next/navigation";
import { VerifyDoctor, registerDoctor } from "@/store/Action/Authentication";
import { info } from "autoprefixer";
import { clearmessage } from "@/store/Reducer/AdminReducer";
//   import { RemoveError, isError } from "@/store/Reducers/controlreducers";

const page = () => {
  const [active, setactive] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otp, setotp] = useState("");
  const [dets, setdets] = useState("");
  const [alert, setalert] = useState("");
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { message, error } = useSelector((state) => state.adminReducer);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const router = useRouter();
  const formSubmit = (e) => {
    e.preventDefault();
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!otp) {
      setactive(true);
      setalert("Please Enter a otp");
    } else {
      const info = {
        number: dets?.number,
        otp: otp,
      };
      dispatch(VerifyDoctor(info));
    }
  };
  useEffect(() => {
    // Access localStorage within the useEffect hook
    const infoString = localStorage.getItem("doctorInfo");
    if (infoString) {
      const info = JSON.parse(infoString);
      setdets(info);
    } else {
      router.push("/doctor/register");
    }
    if (error) {
      setactive(true);
      setalert(error);
    }
    if (message) {
      setactive(true);
      setalert(message);
      dispatch(registerDoctor(dets));
      localStorage.removeItem("doctorInfo");
      dispatch(clearmessage());
      // router.push("/doctor/auth")
    }
  }, [error, message]);
  const handelFirstName = (e) => {
    setfirstName(e.target.value);
    setactive(false);
    setalert("");
  };
  const handelLastName = (e) => {
    setfirstName(e.target.value);
    setactive(false);
    setalert("");
  };

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="w-full flex items-center justify-center  h-screen">
      <div className="side h-full flex-col  w-1/2 p-4 flex items-center justify-center max-lg:hidden ">
        <h1 className="text-3xl font-[poppins]">
          Get started absolutely free .
        </h1>
        <img
          src={"/registerDoctor.png"}
          className="h-[80%] object-center object-contain "
          alt=""
        />
      </div>
      <div className="h-full w-1/2 max-lg:w-full relative flex flex-col items-center gap-6 justify-center">
        <h1 className="leading-normal  text-4xl text-center whitespace-nowrap font-bold font-[poppins] max-lg:text-2xl ">
          Enter Otp to Verify Phone Number
        </h1>

        {/* <h2 className="text-center text-xl leading-relaxed max-md:text-lg">A student's guide to bagging your first gig.</h2> */}
        {/* <h3 className="w-1/2 text-left max-md:text-center">
          Already have an account?
          <Link
            href="/doctor/login"
            className="ml-3 text-green-600 font-normal font-[poppins]"
            onClick={() => dispatch(RemoveError())}
          >
            Sign in
          </Link>
        </h3> */}
        {active ? (
          <Alert severity="warning" className="w-1/2 max-lg:w-[80%]">
            <AlertTitle>Alert</AlertTitle>
            <strong>{alert}</strong>
          </Alert>
        ) : (
          ""
        )}

        <form
          className="grid place-items-start	 gap-8 w-1/2 max-lg:w-[80%]"
          onSubmit={formSubmit}
        >
          <TextField
            id="outlined-basic"
            value={dets?.number}
            type="number"
            variant="outlined"
            className="w-full"
            disabled
            // required
          />
          <TextField
            id="outlined-basic"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            label="One Time Password"
            type="number"
            variant="outlined"
            className="w-full"
            // required
          />

          <div className="flex items-center justify-center gap-5">
            <Alert severity="error">0:{countdown}</Alert>
            <h2
              className={`cursor-pointer font-semibold ${
                countdown === 0
                  ? "pointer-events-auto text-black"
                  : "pointer-events-none cursor-not-allowed text-gray-300"
              }`}
            >
              Resend Otp
            </h2>
          </div>
          <button className="w-full p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded hover:opacity-80  font-semibold">
            Verify Otp
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
