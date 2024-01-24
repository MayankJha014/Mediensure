"use client";
import { getDentalDoctor } from "@/store/Action/others";
import { Box, Button, CircularProgress } from "@mui/material";
import { Divider, Image, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFilled } from "@ant-design/icons";
import {
  changeStatusPost,
  deleteDentalDoctor,
  dentalShown,
  updateDentalDoctor,
} from "@/store/Action/Authentication";
import { toast } from "react-toastify";
import { clearmessage } from "@/store/Reducer/AdminReducer";
const DentalConsultation = ({ setconsultation }) => {
  const [homepage, sethomepage] = useState([]);
  const { imgLink, dentalDoctor, load } = useSelector((state) => state.others);
  const { message, loading } = useSelector((state) => state.adminReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setdetail] = useState();
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
  console.log(dentalDoctor, 478);
  const [status, setstatus] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDentalDoctor());
    if (message) {
      toast.success(message);
      dispatch(clearmessage());
    }
  }, [loading, message]);
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
    dispatch(dentalShown(id));
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
        <div className="flex flex-col gap-5 p-10">
          <Button
            variant="contained"
            onClick={() => setconsultation(true)}
            className="w-fit bg-blue-500"
          >
            Add Consultation
          </Button>
          <div className="overflow-x- w-full">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Shown</th>
                  <th>Image</th>
                  <th>Doctor Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dentalDoctor?.map((dets, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        {console.log(dets?.shown, 7456)}
                        <input
                          type="checkbox"
                          className="toggle"
                          onClick={() => handleCheckboxChange(dets?._id)}
                          checked={dets.shown}
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
                            />
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{dets?.name}</div>
                    </td>
                    <td>{dets?.price}</td>
                    <td>
                      <Select
                        // defaultValue=""
                        value={dets?.status}
                        style={{
                          width: "10vw",
                        }}
                        onChange={(value) => handleChange(value, dets?._id)}
                        options={data}
                      />
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
                <h1 className="text-sm font-semibold">{detail?.name}</h1>
                <h2 className="text-xs">{detail?.type}</h2>
                <h2 className=" px-2 mt-4 py-1 bg-blue-200 w-fit text-xs rounded-xl">
                  {detail?.expierence} year experience
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
                  <h1 className="text-xl font-semibold">Rs. {detail?.price}</h1>
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
        </div>
      )}
    </>
  );
};

export default DentalConsultation;
