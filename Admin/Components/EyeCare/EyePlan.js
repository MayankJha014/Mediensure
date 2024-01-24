"use client"
import { uploadDentalPlan, uploadEyePlan } from "@/store/Action/Authentication";
import { VerifiedUserOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Input } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
const { v4: uuidv4 } = require("uuid");

const EyePlan = ({setopen}) => {
    const [plan, setplan] = useState("");
    const [price, setprice] = useState("")
    const dispatch = useDispatch();
    const Submit = ()=>{

        const info = {
            id:uuidv4(),
            plan:plan,
            price:price
        }
        dispatch(uploadEyePlan(info));
        setprice("");
        setplan("");
        setopen(false)
    }
  return (
    <>
      <div className="w-full flex flex-col items-start bg-gray-100 p-14 gap-[3vw]">
<i className="ri-arrow-left-line text-2xl cursor-pointer" onClick={()=>setopen(false)}></i>
        
      <div className="flex flex-col gap-3 ">
      <h3>Plan Name</h3>
      <Input size="large" value={plan} onChange={(e)=>setplan(e.target.value)} placeholder="Plan Name"  />
      </div>
      <div className="flex flex-col gap-3 ">
      <h3>Plan Price</h3>
      <Input size="large" value={price} onChange={(e)=>setprice(e.target.value)} placeholder="Plan Price" type="number"  />
      </div>
      <Button onClick={Submit} variant="contained" className="bg-blue-500">Submit</Button>
      </div>
    </>
  );
};

export default EyePlan;
