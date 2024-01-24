"use client";
import Patient from "@/Components/Admin/Patient/Patient";
import PatientDets from "@/Components/Admin/Patient/PatientDets";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { getAllPatient } from "@/store/Action/Authentication";
import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const [index, setindex] = useState(null);
  const dispatch = useDispatch();

  const { patient } = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(getAllPatient());
  }, []);
  return (
    <>
      <Nav />
      <div
        className="w-full flex relative overflow-hidden"
        style={{ height: "calc(100vh - 10vh)" }}
      >
        <Sidebar />
        <div className="w-full p-10 overflow-y-auto relative">
          <Breadcrumb
            className="cursor-pointer"
            items={[
              {
                title: "Patients",
              },
              index === null
                ? ""
                : {
                    title: index === null ? "" : patient[index].name,
                  },
            ]}
          />
          
          {index === null ? (
            <Patient data={patient} setindex={setindex} />
          ) : (
            <PatientDets data={patient?.[index]} setindex={setindex} />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
