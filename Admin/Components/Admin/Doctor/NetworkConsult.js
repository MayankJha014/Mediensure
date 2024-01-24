"use client";
import { getNetworkConsult, updateNetworkConsult } from "@/store/Action/Authentication";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, DatePicker, Modal, Tag } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

const NetworkConsult = ({nconsult,updateStatus,isModalOpen,handleCancel,handlesechdule}) => {
  const [search, setsearch] = useState("");
const [time, settime] = useState("");
const [date, setdate] = useState("");
  const [consultFilter, setconsultFilter] = useState([]);
  const dispatch = useDispatch();
  const handleTime = (e) => {
    const formattedTime = e.format("hh:mm A");
    console.log(formattedTime, 796);
    settime(formattedTime);
  };
  const handleDate = (e) => {
    // console.log(e.$D,e.$M + 1,e.$y,e, 796);
    const t = e.format("DD-MM-YYYY");
    setdate(t);
  };

  const handleSearch = (e) => {
    const searchTerm = e.toLowerCase().trim();
    setsearch(e);
    if (e.trim() === "") {
      setconsultFilter([]);
    }
    if (e.trim() !== "") {
      const filtered = nconsult?.filter(
        (i) =>
          i.tele.toLowerCase().includes(searchTerm) ||
          i.patient?.name.toLowerCase().includes(searchTerm) ||
          i?.fees.toString().includes(searchTerm)
      );
      setconsultFilter(filtered);
      console.log(filtered, 489);
    }
  };
 
  
  return (
    <>
      <div className="flex items-center justify-center px-3 py-2 w-fit  bg-[#EFF0F2] gap-3 rounded-lg">
        <i className="ri-search-line text-[#98A1B0]"></i>
        <input
          type="search"
          className="outline-none w-[15vw]  border-none bg-transparent"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
        />
      </div>
      {search.trim() !== "" || consultFilter?.length > 0 ? (
        <div className="overflow-x- w-full mt-5">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-sm text-black">
                <th>Tele Id</th>
                <th>Institute Name</th>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Degree</th>
                <th>Specialization</th>
                <th>Date & Time</th>
                <th>Status</th>
                {/* <th>Prescription</th> */}
              </tr>
            </thead>
            <tbody>
              {search.trim() !== "" && consultFilter?.length === 0 ? (
                <h1>No Data Available</h1>
              ) : (
                consultFilter?.map((dets, index) => (
                  <tr key={index} className="text-gray-500 font-medium">
                    <th>{dets?.tele}</th>
                    <th>
                      {dets?.institute?.institutionName}
                    </th>
                    <th>
                      {dets?.institute?.personName}
                    </th>
                    <th>{dets?.patient?.name}</th>
                    <th>{dets?.type}</th>
                    <th>{dets?.doctor?.type}</th>
                    <th>
                      {dets?.date} & {dets?.time}
                    </th>
                    <th>{dets?.status}</th>
                    {/* <th>
                      {dets?.prescription ? (
                        <Link
                          href={`/admin/prescription/${dets?.prescription?._id}`}
                        >
                          <Tag
                            color={"green"}
                            style={{ display: "flex", width: "fit-content" }}
                            className="p-2 cursor-pointer hover:bg-green-200"
                          >
                            Submited{" "}
                            <img
                              className="h-5 w-5 object-contain"
                              src="/prescription.png"
                              alt=""
                            />
                          </Tag>
                        </Link>
                      ) : (
                        <Tag
                          // onClick={() => setId(dets?._id)}
                          color={"cyan"}
                          style={{ display: "flex", width: "fit-content" }}
                          className="p-2 cursor-pointer hover:bg-cyan-500 hover:text-white"
                        >
                          Prescription{" "}
                          <img
                            className="h-5 w-5 object-contain"
                            src="/prescription.png"
                            alt=""
                          />
                        </Tag>
                      )}
                    </th> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x- w-full mt-5">
    
    <Modal
        open={isModalOpen}
        title="Title"

        centered
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button type="primary" className="bg-blue-500" onClick={()=>handlesechdule(date,time)}>
              Submit
            </Button>
            {/* <CancelBtn />
            <OkBtn /> */}
          </>
        )}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h3>Select time for consultation </h3>
            <DatePicker onChange={(e) => handleDate(e)} className="w-fit" />
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileTimePicker"]}>
              <DemoItem label="Select Time">
                <MobileTimePicker
                  value={time}
                  onChange={(e) => handleTime(e)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </Modal>
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-sm text-black">
                <th>Tele Id</th>
                <th>Institute Name</th>
                <th>Doctor Name</th>
                <th>Patient Name</th>
                <th>Degree</th>
                <th>Specialization</th>
                <th>Date & Time</th>
                <th>Status</th>
                {/* <th>Prescription</th> */}
              </tr>
            </thead>
            <tbody>
              {nconsult?.map((dets, index) => (
                <tr key={index} className="text-gray-500 font-medium">
                  <th>{dets?.tele}</th>
                  <th>
                      {dets?.institute?.institutionName}
                    </th>
                    <th>
                      {dets?.institute?.personName}
                    </th>
                  <th>{dets?.patient?.name}</th>
                  <th>{dets?.institute?.type}</th>
                  <th>{dets?.institute?.specialities}</th>
                  <th>
                    {dets?.date} & {dets?.time}
                  </th>
                  <th>
                    <select className="select select-bordered w-full max-w-xs" onChange={(e)=>updateStatus(dets?._id,e.target.value)} value={dets?.status}>
                      <option value={"Sechdudled"}>Sechdudled</option>
                      <option value={"Canceled"}>Canceled</option>
                      <option value={"Confirmed"}>Confirmed</option>
                      <option value={"Resechdudled"}>Resechdudled</option>
                    </select>
                  </th>
                  {/* <th>
                    {dets?.prescription ? (
                      <Link
                        href={`/admin/prescription/${dets?.prescription?._id}`}
                      >
                        <Tag
                          color={"green"}
                          style={{ display: "flex", width: "fit-content" }}
                          className="p-2 cursor-pointer hover:bg-green-200"
                        >
                          Submited{" "}
                          <img
                            className="h-5 w-5 object-contain"
                            src="/prescription.png"
                            alt=""
                          />
                        </Tag>
                      </Link>
                    ) : (
                      <Tag
                        // onClick={() => setId(dets?._id)}
                        color={"cyan"}
                        style={{ display: "flex", width: "fit-content" }}
                        className="p-2 cursor-pointer hover:bg-cyan-500 hover:text-white"
                      >
                        Prescription{" "}
                        <img
                          className="h-5 w-5 object-contain"
                          src="/prescription.png"
                          alt=""
                        />
                      </Tag>
                    )}
                  </th> */}
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
    </>
  );
};

export default NetworkConsult;
