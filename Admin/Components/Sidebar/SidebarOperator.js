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
import { LeadData, consultData, dentalData, homeData, ivfData } from "./SidebarData";
import { signoutadmin } from "@/store/Action/Authentication";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
const SidebarOperator = () => {
  const params = useParams();
  const [home, sethome] = useState(10);
const dispatch = useDispatch();
const router = useRouter()
const logout = ()=>{
  dispatch(signoutadmin())
router.push("/admin/Auth")
}
  return (
    <>
      <div
        className="w-[15vw] h-full  relative overflow-hidden  shrink-0 flex flex-col  items-start "
        style={{ backgroundColor: "hsl(226.03deg 36.32% 39.41%)" }}
      >
        <Accordion
          classes={{
            root: "custom-accordion-root", // Define a custom class name for the Accordion root
          }}
          className="bg-transparent"
          style={{ width: "100%" ,backgroundColor:"transparent" }}

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
              Doctors
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col px-2 gap-3 w-full">
              {consultData?.map((dets, index) => (
                <Link
                  href={`/operation/${dets?.link}`}
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
        <Link href={"/operation/patient"}>
          <div className="w-full flex items-center justify-start p-4 gap-2 text-lg text-white ">
          <img className="h-6 w-6" src="/patient.png" alt="" />
           
            <h3>Patient</h3>
          </div>
        </Link>
        <Link href={"/operation/institute"}>
          <div className="w-full flex items-center justify-start p-4 gap-2 text-lg text-white ">
          <img className="h-6 w-6" src="/ins.png" alt="" />
          {/* <Remove className="h-2 w-2" />  */}
           
            <h3>Institute</h3>
          </div>
        </Link>
        <Accordion
          classes={{
            root: "custom-accordion-root", // Define a custom class name for the Accordion root
          }}
          className="bg-transparent"
          style={{ width: "100%",backgroundColor:"transparent"  }}

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
              <img className="h-8 w-8" src="/Lead.png" alt="" />
              Leads
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col px-2 gap-3 w-full">
              {LeadData?.map((dets, index) => (
                <Link
                  href={`/operation/lead/${dets?.link}`}
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

export default SidebarOperator;
