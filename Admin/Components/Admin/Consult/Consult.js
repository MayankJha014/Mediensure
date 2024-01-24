import { Tag } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const Consult = ({ data }) => {
  const [search, setsearch] = useState("");
  const [consultFilter, setconsultFilter] = useState([]);
  const handleSearch = (e) => {
    const searchTerm = e.toLowerCase().trim();
    setsearch(e);
    if (e.trim() === "") {
      setconsultFilter([]);
    }
    if (e.trim() !== "") {
      const filtered = data?.filter(
        (i) =>
          i.tele.toLowerCase().includes(searchTerm) ||
          i.patient?.name.toLowerCase().includes(searchTerm) ||
          i?.fees.toString().includes(searchTerm)
      );
      setconsultFilter(filtered);
      console.log(filtered,489);
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
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Consultation fees</th>
                <th>Specialization</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Prescription</th>
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
                      {dets?.doctor?.firstname} {dets?.doctor?.lastname}
                    </th>
                    <th>{dets?.patient?.name}</th>
                    <th>{dets?.fees}</th>
                    <th>{dets?.doctor?.type}</th>
                    <th>
                      {dets?.date} & {dets?.time}
                    </th>
                    <th>{dets?.status}</th>
                    <th>
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
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto w-full mt-5">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-sm text-black">
                <th>Tele Id</th>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Consultation fees</th>
                <th>Specialization</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Prescription</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dets, index) => (
                <tr key={index} className="text-gray-500 font-medium">
                  <th>{dets?.tele}</th>
                  <th>
                    {dets?.doctor?.firstname} {dets?.doctor?.lastname}
                  </th>
                  <th>{dets?.patient?.name}</th>
                  <th>{dets?.fees}</th>
                  <th>{dets?.doctor?.type}</th>
                  <th>
                    {dets?.date} & {dets?.time}
                  </th>
                  <th>{dets?.status}</th>
                  <th>
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
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Consult;
