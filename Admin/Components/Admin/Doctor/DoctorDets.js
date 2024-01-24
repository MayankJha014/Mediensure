"use client";
import { getDentalDoctor, getDoctors } from "@/store/Action/others";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Divider, Image, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFilled } from "@ant-design/icons";
import {
  changeStatusPost,
  deleteDentalDoctor,
  doctorVerified,
  getadmin,
  updateDentalDoctor,
  uploadPrice,
} from "@/store/Action/Authentication";
import { toast } from "react-toastify";
import { clearmessage } from "@/store/Reducer/AdminReducer";
const DoctorDets = () => {
  const [homepage, sethomepage] = useState([]);
  const { imgLink, Doctor, load } = useSelector((state) => state.others);
  const { message, loading, admin } = useSelector(
    (state) => state.adminReducer
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setdetail] = useState();
  const [customPriceOpen, setcustomPriceOpen] = useState(false);
  const [newPrice, setnewPrice] = useState("");
  const [search, setsearch] = useState("");
  const [doctorFilter, setdoctorFilter] = useState([]);
  const showPriceModel = (dets) => {
    setcustomPriceOpen(true);
    setdetail(dets);
    setnewPrice(dets?.premium);
  };
  const closePriceModel = () => {
    setcustomPriceOpen(false);
    setnewPrice("");
  };
  const savePremium = () => {
    const info = {
      premium: newPrice,
    };
    dispatch(uploadPrice(detail?._id, info));
    setcustomPriceOpen(false);
    setnewPrice("");
    const data = {
      address: "Shade A1 Ashoka Garden 80feet road As Mobile Matra shri collection",
      anyallergy: "No",
      anydrugHistory: "No",
      anysurgery: "No",
      city: "Bhopal",
      createdAt: "2023-12-26T15:33:28.419Z",
      drugHistory: "",
      email: "garvitjainraju@gmail.com",
      gender: "Male",
      medicalHistory: "DEMO history",
      naam: "garvitjain",
      name: "Garvit Jain",
      occupation: "Farmer",
      phone: 8839893207,
     state: "Madhya Pradesh"
    }
  };
  const showModal = (dets) => {
    setIsModalOpen(true);
    setdetail(dets);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(Doctor, 478);
  const [status, setstatus] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getadmin());
   
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearmessage());
    }
  }, [loading,message])
  
  const handleChange = (value, id) => {
    setstatus(value);
    const info = {
      status: value,
    };
    dispatch(updateDentalDoctor(id, info));
  };

  const doctorDelete = (id) => {
    dispatch(deleteDentalDoctor(id));
  };
  const data = [
    {
      value: "Now",
      label: "Now",
    },
    {
      value: "Today",
      label: "Today",
    },
    {
      value: "Tomorrow",
      label: "Tomorrow",
    },
  ];
  const handleCheckboxChange = (id) => {
    dispatch(doctorVerified(id));
  };
  const handleSearch = (e) => {
    const searchTerm = e.toLowerCase().trim();
    setsearch(e);
    if (e.trim() === "") {
      setdoctorFilter([]);
    }
    if (e.trim() !== "") {
      const filtered = Doctor?.filter((i) => {
        const fullName =
          `${i?.firstname.toLowerCase()} ${i?.lastname.toLowerCase()}`.trim();
        return fullName.includes(searchTerm);
      });
      setdoctorFilter(filtered);
    }
  };
  // console.log(detail?.language?.split(",").join(", "), 456)
  return (
    <>
      {loading || load ? (
        <div className="w-full relative h-full flex items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className="flex flex-col gap-5 p-10 w-full">
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

          {search.trim() !== "" || doctorFilter?.length > 0 ? (
            <div className="overflow-x- w-full">
              <table className="table w-full">
                {/* head */}

                <thead>
                  <tr>
                    <th>Verified</th>
                    <th>Image</th>
                    <th>Doctor Name</th>
                    <th>Doctor Charge</th>
                    <th>Consultation fees</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {search.trim() !== "" && doctorFilter?.length === 0 ? (
                    <h1>No Doctor With this name</h1>
                  ) : (
                    doctorFilter?.map((dets, index) => (
                      <tr key={index}>
                        <th className="flex flex-col">
                          <h3 className="text-sm">
                            {dets?.form ? "REGISTERED BY FORM" : ""}
                          </h3>

                          <label>
                            <input
                              type="checkbox"
                              className="toggle"
                              onClick={() => handleCheckboxChange(dets?._id)}
                              checked={dets.isVerified}
                            />
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <Image
                                  src={`${imgLink}/${dets?.img?.filename}/${dets?.img?.mimetype}`}
                                  alt="Avatar Tailwind CSS Component"
                                  height={"100%"}
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </td>
                        <td>
                          <div className="font-bold">
                            {dets?.firstname} {dets?.lastname}
                          </div>
                        </td>
                        <td>{dets?.fees}</td>
                        <td onClick={() => showPriceModel(dets)}>
                          <div className="flex">
                            {dets?.premium === 0
                              ? Math.round(
                                  Number(dets?.fees) +
                                    (admin?.consultationFees / 100) * dets?.fees
                                )
                              : Number(dets?.fees) + dets?.premium}
                            <div className="flex gap-2 items-center justify-center w-fit ml-2 cursor-pointer">
                              <i className="ri-edit-2-fill"></i>
                              <i
                                className={`ri-vip-crown-2-fill ${
                                  dets?.premium !== 0
                                    ? "text-orange-400"
                                    : "text-gray-400"
                                }`}
                              ></i>
                            </div>
                          </div>
                        </td>

                        <td>
                          {/* <Select
                        // defaultValue=""
                        value={dets?.status}
                        style={{
                          width: "10vw",
                        }}
                        onChange={(value) => handleChange(value, dets?._id)}
                        options={data}
                      /> */}
                          {dets?.status}
                        </td>
                        <th>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => showModal(dets)}
                          >
                            details
                          </button>
                        </th>
                        <th>
                          <DeleteFilled
                            onClick={() => doctorDelete(dets?._id)}
                          />
                        </th>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x- w-full">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>Verified</th>
                    <th>Image</th>
                    <th>Doctor Name</th>
                    <th>Doctor Charge</th>
                    <th>Consultation fees</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Doctor?.map((dets, index) => (
                    <tr key={index}>
                      <th className="flex flex-col">
                        <h3 className="text-[.6vw]">
                          {dets?.form ? "REGISTERED BY FORM" : ""}
                        </h3>

                        <label>
                          <input
                            type="checkbox"
                            className="toggle"
                            onClick={() => handleCheckboxChange(dets?._id)}
                            checked={dets.isVerified}
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src={`${imgLink}/${dets?.img?.filename}/${dets?.img?.mimetype}`}
                                alt="Avatar Tailwind CSS Component"
                                height={"100%"}
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold">
                          {dets?.firstname} {dets?.lastname}
                        </div>
                      </td>
                      <td>{dets?.fees}</td>
                      <td onClick={() => showPriceModel(dets)}>
                        <div className="flex">
                          {dets?.premium === 0
                            ? Math.round(
                                Number(dets?.fees) +
                                  (admin?.consultationFees / 100) * dets?.fees
                              )
                            : Number(dets?.fees) + dets?.premium}
                          <div className="flex gap-2 items-center justify-center w-fit ml-2 cursor-pointer">
                            <i className="ri-edit-2-fill"></i>
                            <i
                              className={`ri-vip-crown-2-fill ${
                                dets?.premium !== 0
                                  ? "text-orange-400"
                                  : "text-gray-400"
                              }`}
                            ></i>
                          </div>
                        </div>
                      </td>

                      <td>
                        {/* <Select
                   // defaultValue=""
                   value={dets?.status}
                   style={{
                     width: "10vw",
                   }}
                   onChange={(value) => handleChange(value, dets?._id)}
                   options={data}
                 /> */}
                        {dets?.status}
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => showModal(dets)}
                        >
                          details
                        </button>
                      </th>
                      <th>
                        <DeleteFilled onClick={() => doctorDelete(dets?._id)} />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Modal
            title="Doctor Details"
            centered
            onCancel={handleCancel}
            open={isModalOpen}
            footer={""}
            width={"fit-content"}
          >
            <div
              // key={index}
              className="h-fit w-[40vw] rounded-lg  flex border-gray-300 border-2 "
            >
              <div className="h-fit w-[40%] shrink-0 py-5 px-5 ">
                <img
                  className="h-48 w-full object-contain shrink-0"
                  src={`${imgLink}/${detail?.img?.filename}/${detail?.img?.mimetype}`}
                  alt=""
                />
              </div>

              <div className="h-fit w-full py-4 ">
                <h1 className="text-[.6vw] font-semibold">
                  {detail?.firstname} {detail?.lastname}
                </h1>
                <h2 className="text-xs">{detail?.type}</h2>
                <h2 className=" px-2 mt-4 py-1 bg-blue-200 w-fit text-xs rounded-xl">
                  {detail?.experience} year experience
                </h2>
                <div className="h-fit w-fit flex gap-5 py-2 ">
                  <h1 className="text-xs font-semibold">{detail?.language}</h1>
                  {/* <h2 className=" px-5 mt-4 py-2 bg-blue-400 text-white w-fit  font-semibold text-xs rounded-lg">
                    {" "}
                    Consult
                  </h2> */}
                </div>
                <Divider
                  style={{ borderBottomWidth: "2px", marginTop: "8px" }}
                />

                <div className="h-fit w-fit flex gap-24 items-center justify-center py-2 ">
                  <h1 className="text-xl font-semibold">
                    Rs.{" "} 
                    {Math.round(
                      Number(detail?.fees) +
                        (admin?.consultationFees / 100) * detail?.fees
                    )}
                  </h1>
                  {/* <h2
                    className=" px-10 mt-4 py-2  text-white w-fit  font-semibold text-xs rounded-lg"
                    style={{ backgroundColor: "rgb(51 164 32)" }}
                  >
                    {" "}
                    Consult Now
                  </h2> */}
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            title="Custome Consultation Fees"
            centered
            onCancel={closePriceModel}
            open={customPriceOpen}
            footer={""}
            width={"fit-content"}
          >
            <div
              // key={index}
              className="h-fit w-[40vw] rounded-lg  flex flex-col items-center justify-center gap-4 border-gray-300 border-2 p-4"
            >
              <div className="flex  items-center justify-center gap-4">
                {/* <input
              size="large"
              type="number"
              name="firstname"
              className="w-1/2 px-2 py-1 border-2 hover:shadow-sm hover:shadow-blue-300 duration-300 ease-linear outline-blue-600"
              disabled
              // defaultValue={doctor?.firstname}
            />  */}
                <TextField label="Consultation Fees" value={detail?.fees} />
                <h1 className="text-2xl">+</h1>
                <TextField
                  label="Add Fees"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setnewPrice(e.target.value)}
                />
              </div>
              <Button
                variant="contained"
                className="bg-blue-500"
                onClick={savePremium}
              >
                Submit
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default DoctorDets;


