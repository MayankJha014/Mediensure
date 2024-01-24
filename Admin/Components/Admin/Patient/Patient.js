"use client";
import React, { useState } from "react";

const Patient = ({ data, setindex }) => {
  const [search, setsearch] = useState("");
  const [patientFilter, setpatientFilter] = useState([]);
  const handleSearch = (e) => {
    const searchTerm = e.toLowerCase().trim();
    setsearch(e);
    if (e.trim() === "") {
      setpatientFilter([]);
    }
    if (e.trim() !== "") {
      const filtered = data?.filter((i) => i?.name.toLowerCase().includes(searchTerm) || i?.email.toLowerCase().includes(searchTerm) ||   (i?.phone && i?.phone.toString().includes(searchTerm)) );
      setpatientFilter(filtered);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-3 py-2 w-fit mt-5  bg-[#EFF0F2] gap-3 rounded-lg">
        <i className="ri-search-line text-[#98A1B0]"></i>
        <input
          type="search"
          className="outline-none w-[15vw]  border-none bg-transparent"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
        />
      </div>
      {search.trim() !== "" || patientFilter?.length > 0 ? (
        <div className="overflow-x- w-full mt-5">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-sm text-black">
                <th>Patient Id</th>
                <th>Patient Name</th>
                <th>Patient Email</th>
                <th>Patient Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {search.trim() !== "" && patientFilter?.length === 0 ? (
                <h1>No Data Available</h1>
              ) : (
                patientFilter?.map((dets, index) => (
                  <tr key={index} className="text-gray-500 font-medium">
                    <th onClick={() => setindex(index)}>{dets?._id}</th>
                    <th>{dets?.name}</th>
                    <th>{dets?.email}</th>
                    <th>{dets?.phone}</th>
                    <th>{dets?.type}</th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x- w-full mt-5">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-sm text-black">
                <th>Patient Id</th>
                <th>Patient Name</th>
                <th>Patient Email</th>
                <th>Patient Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dets, index) => (
                <tr key={index} className="text-gray-500 font-medium">
                  <th onClick={() => setindex(index)}>{dets?._id}</th>
                  <th>{dets?.name}</th>
                  <th>{dets?.email}</th>
                  <th>{dets?.phone}</th>
                  <th>{dets?.type}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Patient;
