"use client";
import { Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { checkUser } from "@/store/Action/auth";

const Profile = ({user}) => {
  const file = useRef(null);
  const openfile = () => {
    file.current.click();
  };
  const [name, setname] = useState("");
  const [last, setLast] = useState("");
  const [email, setemail] = useState("");
  const [medicialName, setmedicialName] = useState("");
  const [gst, setgst] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [phone, setphone] = useState("");
  const [pinCode, setpinCode] = useState("");
  const dispatch = useDispatch();
  const uploadImage = (e) => {
    const myform = new FormData();
    myform.set("avatar", e.target.files[0]);
    dispatch(uploadAvatar(myform));
  };

  useEffect(() => {
    if (user) {
      setname(user?.name);
      setLast(user?.lastname);
      setemail(user?.email);
      setphone(user?.phone);
      setgst(user?.gst);
      setmedicialName(user?.medicalName);
      setpinCode(user?.pinCode);
      setgst(user?.gst);
      setphone(user?.phone);
      setcity(user?.city);
      setstate(user?.state);
      setaddress(user?.address);
    }
  }, [user]);

  const submitData = () => {
    const info = {
      firstname: name,
      lastname: last,
      email: email,
      medicalName: medicialName,
      phone: phone,
      gst: gst,
      address: address,
      state: state,
      city: city,
      pinCode: pinCode,
    };
    if (
      name &&
      last &&
      email &&
      medicialName &&
      phone &&
      gst &&
      address &&
      state &&
      city &&
      pinCode
    ) {
      // dispatch(updateDetails(info));
    } else {
      toast.error("All details are required");
    }
  };
  return (
    <div className="w-full min-h-full relative overflow-y-auto items-center justify-center flex">
      <div className="h-full w-[30%] flex flex-col items-center justify-center mt-10 p-10">
        {user?.avatar ? (
          <Image
            src={user?.avatar?.url}
            width={"20vw"}
            height={"20vw"}
            style={{ borderRadius: "100%" }}
          />
        ) : (
          <Skeleton variant="circular" width={"20vw"} height={"20vw"} />
        )}

        <div
          onClick={openfile}
          className="div flex items-center justify-center p-6 px-14 mt-10 gap-2 text-lg font-semibold text-blue-400 cursor-pointer border-dashed border-2 border-blue-300 bg-blue-100"
        >
          <i className="ri-upload-cloud-2-line"></i>
          Upload Shop Image
          <input
            type="file"
            name="img"
            accept=".png, .jpg, .jpeg .avif"
            ref={file}
            onChange={(e) => uploadImage(e)}
            className="hidden"
          />
        </div>
      </div>
      <div className="h-full w-[70%] grid grid-cols-2 place-content-center place-items-center  gap-5 p-4 pt-10">
        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>

        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">Contact</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Type here"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            // value={pinCode}
            // onChange={(e) => setpinCode(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">State</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={state}
            onChange={(e) => setstate(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <label className="label">
            <span className="label-text">Pin Code</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={pinCode}
            onChange={(e) => setpinCode(e.target.value)}
            className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
          />
        </div>
        <span></span>
        <button
          onClick={submitData}
          className="p-4 px-14 rounded-lg bg-green-600 text-white ease-linear transition-all duration-300 hover:shadow-md hover:bg-green-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
