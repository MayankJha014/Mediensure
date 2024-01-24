"use client";
import AddDentalConsult from "@/Components/Dental/Consultation/AddDentalConsult";
import DentalConsultation from "@/Components/Dental/Consultation/DentalConsultation";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { checkAdmin } from "@/store/Action/Authentication";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const [consultation, setconsultation] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAdmin());
  }, [isAuthenticated]);

  return (
    <>
      <Nav />
      <div
        className="w-full flex relative overflow-hidden"
        style={{ height: "calc(100vh - 10vh)" }}
      >
        <Sidebar />
        <div className="w-full relative overflow-y-auto">
          {consultation ? (
            <AddDentalConsult setOpen={setconsultation} />
          ) : (
            <DentalConsultation setconsultation={setconsultation} />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
