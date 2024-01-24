"use client";
import AddDentalConsult from "@/Components/Dental/Consultation/AddDentalConsult";
import SideDoctor from "@/Components/Doctor/SidebarDoctor/SideDoctor";
import Nav from "@/Components/Nav/Nav";
import NavDoctor from "@/Components/Nav/NavDoctor";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { getDoctor } from "@/store/Action/Authentication";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state.adminReducer);
  const { imgLink } = useSelector((state) => state.others);
  useEffect(() => {
    dispatch(getDoctor());
  }, []);

  return (
    <>
      <NavDoctor />
      <div
        className="w-full flex bg-gray-100"
        style={{ height: "calc(100vh - 10vh)" }}
      >
        <SideDoctor />
        <div className="w-full h-full flex p-5">
          <div className="h-full w-[30%]">
            <img
              className="h-fit w-full object-contain rounded-xl"
              src={`${imgLink}/${doctor?.img?.filename}/${doctor?.img?.mimetype}`}
              alt=""
            />
          </div>
          <div className="h-full w-[70%] flex flex-col relative overflow-y-auto scrollbar-thin scrollbar-h-5 scrollbar-track-rounded-lg scrollbar-thumb-gray-200 scrollbar-track-gray-100">
            <AddDentalConsult doctor={doctor} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
