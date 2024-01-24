"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Circle, Remove } from "@mui/icons-material";
import { useState } from "react";
// import { LeadData, consultData, dentalData, homeData } from "./SidebarData";
const Sidebar = ({ setopen }) => {
  const params = useParams();
  const [home, sethome] = useState(10);

  return (
    <>
      <div
        className="w-[15vw] h-full  relative overflow-hidden  shrink-0 flex flex-col  min-h-full items-start"
        style={{ backgroundColor: "hsl(226.03deg 36.32% 39.41%)" }}
      >
        <div
          onClick={() => setopen(0)}
          className="w-full cursor-pointer flex items-center justify-start p-4 gap-2 text-lg text-white border-b border-black"
        >
          <i className="ri-user-settings-fill"></i>
          <h3>Profile</h3>
        </div>
        <div
          onClick={() => setopen(1)}
          className="w-full cursor-pointer flex-shrink-0 flex items-center justify-start p-4 gap-2 text-lg text-white border-b border-black"
        >
          <img
            src="/consultation.png"
            className="h-7 w-6 object-contain"
            alt=""
          />
          <h3 className="whitespace-nowrap">Consultations history</h3>
        </div>
        <div
          onClick={() => setopen(4)}
          className="w-full cursor-pointer flex-shrink-0 flex items-center justify-start p-4 gap-2 text-lg text-white border-b border-black"
        >
          <img
            src="/consultation.png"
            className="h-7 w-6 object-contain"
            alt=""
          />
          <h3 className="whitespace-nowrap">Offline Consultations</h3>
        </div>
        {/* <div
          onClick={() => setopen(2)}
          className="w-full cursor-pointer flex items-center justify-start p-4 gap-2 text-lg text-white border-b border-black"
        >
          <img
            src="/prescription.png"
            className="h-7 w-6 object-contain"
            alt=""
          />
          <h3>Prescriptions history</h3>
        </div> */}
        <div
          onClick={() => setopen(3)}
          className="w-full cursor-pointer flex items-center justify-start p-4 gap-2 text-lg text-white border-b border-black"
        >
          <img
            src="/prescription.png"
            className="h-7 w-6 object-contain"
            alt=""
          />
          <h3>Feedback</h3>
        </div>
        <div className="w-full cursor-pointer flex items-center justify-start p-4 gap-2 text-lg text-white border-b border-black">
          <i className="ri-wallet-3-line"></i>
          <h3>Payment history</h3>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
