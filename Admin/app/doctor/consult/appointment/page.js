"use client";
import Appointment from "@/Components/Doctor/Consult/Appointment";
import Prescription from "@/Components/Doctor/Consult/Prescription";
import SideDoctor from "@/Components/Doctor/SidebarDoctor/SideDoctor";
import Nav from "@/Components/Nav/Nav";
import NavDoctor from "@/Components/Nav/NavDoctor";
import Sidebar from "@/Components/Sidebar/Sidebar";
import React, { useState } from "react";

const page = () => {
  const [consultId, setconsultId] = useState("");
  return (
    <>
      <NavDoctor />
      <div className="w-full flex" style={{ height: "calc(100vh - 10vh)" }}>
        <SideDoctor />
        <div className="w-full h-full flex flex-col p-10 relative overflow-y-auto">
          {consultId ? (
            <Prescription consult={consultId} setconsult={setconsultId} />
          ) : (
            <Appointment setId={setconsultId} />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
