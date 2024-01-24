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
const Sidebar = () => {
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
        className="w-[15vw] h-full scrollbar-thin relative overflow-x-hidden overflow-y-auto shrink-0 flex flex-col  items-start "
        style={{ backgroundColor: "hsl(226.03deg 36.32% 39.41%)" }}
      >
    
        <Accordion
          classes={{
            root: "custom-accordion-root", // Define a custom class name for the Accordion root
          }}
          className="bg-transparent"
          style={{ width: "100%",backgroundColor:"transparent" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon className="text-white font-extralight"></ExpandMoreIcon>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              className="flex w-full items-center gap-2 text-white"
              style={{ width: "100%",backgroundColor:"transparent"  }}
            >
              {" "}
              <img className="h-5 w-5" src="/home.png" alt="" />
              Homepage
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col px-2 gap-3 w-full">
              {homeData?.map((dets, index) => (
                <Link
                  href={`/admin/home/${dets?.link}`}
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

              {/* <Link href={"/admin/Number()/company"}>
                <div className= {`flex items-center  text-gray-300 justify-start gap-2`}>
                  <Remove className="h-2 w-2" /> <h2>Company Images</h2>
                </div>
              </Link>
              <Link href={"/admin/home/review"}>
                <div className= {`flex items-center  text-gray-300 justify-start gap-2`}>
                  <Remove className="h-2 w-2" /> <h2>Reviews</h2>
                </div>
              </Link>
              <Link href={"/admin/allcase"}>
                <div className= {`flex items-center  text-gray-300 justify-start gap-2`}>
                  <Remove className="h-2 w-2" /> <h2>Blogs</h2>
                </div>
              </Link>
              <Link href={"/admin/allcase"}>
                <div className= {`flex items-center  text-gray-300 justify-start gap-2`}>
                  <Remove className="h-2 w-2" /> <h2>Posts</h2>
                </div>
              </Link> */}
            </div>
          </AccordionDetails>
        </Accordion>
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
              <img className="h-6 w-6" src="/dental.png" alt="" />
              Dental Care
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col px-2 gap-3 w-full">
              {dentalData?.map((dets, index) => (
                <Link
                  href={`/admin/dental/${dets?.link}`}
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
              <img className="h-8 w-8" src="/eye.png" alt="" />
              Eye Care
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col px-2 gap-3 w-full">
              {dentalData?.map((dets, index) => (
                <Link
                  href={`/admin/eye/${dets?.link}`}
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
              <img className="h-6 w-6" src="/ivf.png" alt="" />
              IVF 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col px-2 gap-3 w-full">
              {ivfData?.map((dets, index) => (
                <Link
                  href={`/admin/ivf/${dets?.link}`}
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
                  href={`/admin/${dets?.link}`}
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
        <Link href={"/admin/patient"}>
          <div className="w-full flex items-center justify-start p-4 gap-2 text-lg text-white ">
          <img className="h-6 w-6" src="/patient.png" alt="" />
           
            <h3>Patient</h3>
          </div>
        </Link>
        <Link href={"/admin/operation"}>
          <div className="w-full flex items-center justify-start p-4 gap-2 text-lg text-white ">
          <img className="h-6 w-6" src="/patient.png" alt="" />
           
            <h3>Operators</h3>
          </div>
        </Link>
        <Link href={"/admin/home/institute"}>
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
                  href={`/admin/lead/${dets?.link}`}
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

export default Sidebar;
