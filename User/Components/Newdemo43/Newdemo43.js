"use client";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Newdemo43 = () => {
  // const dispatch = useDispatch();
  const router = useRouter()
  const [pinCode, setpinCode] = useState("");
  const setpin = (e)=>{
    setpinCode(e);

    if(e.length > 6 ){
      toast.error("Pincode should be only of 6 digits")
      setpinCode("");
    }
  }
  const submitPin = ()=>{
   if(pinCode){
    router.push(`/mediensure/consultation/${pinCode}`)
   }else{
    toast.error("Please enter a pincode")
   }
  }
  return (
    <>
      <div className="h-fit w-full flex gap-12 items-center justify-center px-28 max-md:flex-col  max-md:gap-1   max-md:px-0  max-md:h-full">
        <div className="h-fit w-[30vw] max-md:h-fit max-md:w-fit">
          <img
            className="max-md:w-[90vw] max-md:h-[20vh] max-md:ml-6"
            src="/location.png"
            alt=""
          />
        </div>
        <div className="h-[70vh] w-1/2  flex flex-col gap-5  items-start justify-center max-md:w-fit max-md:h-fit max-md:py-4 max-md:gap-4">
          <h1 className="font-bold text-xl pl-2  " style={{ color: "#4e6f28" }}>
            {" "}
            FIND A CLINIC NEAR YOU{" "}
          </h1>
          <input
            type="text"
            placeholder="Enter Pincode"
            className="input input-bordered  rounded-md w-full py-2 px-3 max-w-xs max-md:px-5 max-md:w-[45vw] max-md:ml-8"
            style={{ border: "1px solid black" }}
            value={pinCode}
            onChange={(e)=>setpin(e.target.value)}
          />

          <button
            class="w-fit ml-11 text-white font-bold py-2 px-20  rounded-xl  max-md:px-0 max-md:rounded-lg max-md:w-[45vw] max-md:ml-8"
            style={{ backgroundColor: "#567237" }}
            onClick={submitPin}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Newdemo43;
