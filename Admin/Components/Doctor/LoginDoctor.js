"use client";
export const metadata = {
  title: "LoginDoctor | admin",
};

import { Alert, AlertTitle, CircularProgress, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import {
  call,
  getDoctor,
  getadmin,
  loginDoctor,
  signinadmin,
} from "@/store/Action/Authentication";
import { useRouter } from "next/navigation";
import {
  RemoveError,
  clearError,
  clearmessage,
  isError,
} from "@/store/Reducer/AdminReducer";
import { toast } from "react-toastify";

const LoginDoctor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState("");
  const [active, setactive] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { message, error, loading, isAuthenticatedDoctor } = useSelector(
    (state) => state.adminReducer
  );
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handelEmail = (e) => {
    setemail(e.target.value);
    setactive(false);
  };
  const handelPassword = (e) => {
    setpassword(e.target.value);
    setactive(false);
  };
  const router = useRouter();
  console.log(email, password, 789);
  const formSubmit = (e) => {
    e.preventDefault();
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (email !== "" && password !== "") {
      // if(!password.match(passwordRegex)){
      //   return dispatch(isError("Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"))
      // }
      const info = { email, password };

      dispatch(loginDoctor(info));
    } else {
      setactive(true);
      if (email === "") {
        setalert("Email is required");
      }
      if (password === "") {
        setalert("Password is required");
      }
      if (email === "" && password === "") {
        setalert("Email & Password is required");
      }
    }
  };
  useEffect(() => {
    // dispatch(call())
    dispatch(getDoctor());
    // if(error){
    //  setactive(true);
    //  setalert(error);
    //  dispatch(clearError())

    // }

    //   console.log(isAuthenticated);
  }, []);
  useEffect(() => {
    if (message) {
      toast.message(message);
      dispatch(clearmessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticatedDoctor) {
      router.push("/doctor/auth");
    }
  }, [message, error, loading, isAuthenticatedDoctor]);

  return (
    <>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full flex  items-center justify-center h-screen">
          <div className="side h-full flex-col  w-fit p-4 flex items-center justify-center max-lg:hidden ">
            <h1 className="text-5xl font-[poppins]">
              Hi , Welcome Back Doctor 👋
            </h1>
            <img
              src={"/doctorLogin.svg"}
              className="h-[70%] object-center object-contain"
              alt=""
            />
          </div>
          <div className="h-full w-1/2 max-lg:w-full  relative flex flex-col items-center gap-6 justify-center">
            <h1 className=" text-4xl whitespace-nowrap font-bold font-[poppins]">
              Doctor Please Login to MediEnsure
            </h1>
            <h3 className="w-1/2 max-lg:w-full max-lg:text-center text-left">
              New Doctor ?
              <Link
                href="/doctor/register"
                className="ml-3 text-green-600 font-normal font-[poppins]"
                //   onClick={()=> dispatch(RemoveError())}
              >
                Create an account
              </Link>
            </h3>
            {active ? (
              <Alert severity="warning" className="w-1/2">
                <AlertTitle>Alert</AlertTitle>
                <strong>{alert}</strong>
              </Alert>
            ) : (
              ""
            )}

            <form
              autoComplete="false"
              className="grid gap-8 w-1/2 "
              onSubmit={formSubmit}
            >
              <TextField
                id="outlined-basic"
                value={email}
                onChange={handelEmail}
                label="Email"
                type="email"
                variant="outlined"
                // required
              />
              <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  value={password}
                  onChange={handelPassword}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  // required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        className="ease-in duration-1000	"
                      >
                        {showPassword ? (
                          <i className="ri-eye-line"></i>
                        ) : (
                          <i className="ri-eye-close-line"></i>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Link
                href="/admin/forget"
                className="text-black fs-xl w-full text-right font-[poppins]"
                onClick={() => dispatch(RemoveError())}
              >
                Forget Password ?
              </Link>
              <button className="w-full p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded hover:opacity-80  font-semibold">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginDoctor;
