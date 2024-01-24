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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorLogout, getDoctor } from "@/store/Action/Authentication";
import { doctorConsultationData } from "@/Components/Sidebar/SidebarData";
import { useRouter } from "next/navigation";
// import { dentalData, homeData } from "./SidebarData";
const SideDoctor = () => {
  const params = useParams();
  const [home, sethome] = useState(10);
const dispatch = useDispatch();
const router = useRouter();
const logout = ()=>{
  dispatch(doctorLogout());
  router.push("/doctor/login")
}

  return (
    <>
      <div
        className="w-[15vw] h-full  relative overflow-hidden  shrink-0 flex flex-col  min-h-full items-start"
        style={{ backgroundColor: "hsl(226.03deg 36.32% 39.41%)" }}
      >

        <Link href={"/doctor/bookdoctor"} className="w-full border-b-[1px] border-white">
          <div className="w-full flex items-center justify-start p-4 gap-2 text-lg text-white ">
           <img src="/doctor.png" className="h-8 w-7 object-contain" alt="" />
            <h3>Profile</h3>
          </div>
        </Link>
        <Accordion
          classes={{
            root: "custom-accordion-root", // Define a custom class name for the Accordion root
          }}
          className="bg-transparent"
          style={{ width: "100%",borderBottom:"1px solid white" }}
          

        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon className="text-white font-extralight"></ExpandMoreIcon>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="flex items-center gap-2 text-white">
              {" "}
              <img className="h-8 w-8" src="/consultation.png" alt="" />
              Consultations
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col px-2 gap-3 w-full">
              {doctorConsultationData?.map((dets, index) => (
                <Link
                  href={`/doctor/consult/${dets?.link}`}
                  onClick={() => sethome(index)}
                >
                  <div
                    className={`flex items-center ${
                      index === Number(home) ? "text-white" : "text-gray-300"
                    }  justify-start gap-2`}
                  >
                    <Remove className="h-2 w-2" /> <h2>{dets?.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
  

        <div onClick={logout} className="w-full mt-auto border-t flex items-center justify-start p-4 gap-2 text-lg text-white ">
          <i className="ri-logout-box-line"></i>
          <h3>Log out</h3>
        </div>
      </div>
    </>
  );
};

export default SideDoctor;
