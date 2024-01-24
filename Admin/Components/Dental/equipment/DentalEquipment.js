"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDentalEquipments } from "@/store/Action/others";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Image, Modal } from "antd";
import { DeleteOutlined } from "@mui/icons-material";
import { Pagination } from "swiper/modules";
import { deleteDentalEqupment, updateEquipment } from "@/store/Action/Authentication";
import EquipmentDetail from "./EquipmentDetail";
import { toast } from "react-toastify";
import { clearmessage } from "@/store/Reducer/AdminReducer";
const DentalEquipment = ({ setopen,equipmentdets }) => {
  const { loading, message } = useSelector((state) => state.adminReducer);
const { load } = useSelector((state) => state.others);
  const { imgLink } = useSelector((state) => state.others);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipment, setequipment] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDentalEquipments());
    // if (message) {
    //   toast.success(message);
    //   dispatch(clearmessage())
    // }
  }, [loading, message]);
  const equipDelete = (id) => {
    dispatch(deleteDentalEqupment(id));
  };
  const showModal = (dets) => {
    setIsModalOpen(true);
    setequipment(dets);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCheckboxChange = (id)=>{
    dispatch(updateEquipment(id));
  }
  return (
    <>
      {isModalOpen ? (
        <EquipmentDetail setOpen={setIsModalOpen} equipment={equipment} />
      ) : loading || load ? (
        <div className="w-full relative h-full flex items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className="flex flex-col gap-5 p-10">
          <Button
            variant="contained"
            onClick={() => setopen(true)}
            className="w-fit bg-blue-500"
          >
            Add Equipments
          </Button>
          <div className="overflow-x- w-full">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Shown</th>
                  <th>Image</th>
                  <th>Equipment Name</th>
                  <th>Colour</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {equipmentdets?.map((dets, index) => (
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
                              src={`${imgLink}/${dets?.img[0]?.filename}/${dets?.img[0]?.mimetype}`}
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
                    <td className="w-fit">{dets?.colour}</td>

                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => showModal(dets)}
                      >
                        details
                      </button>
                    </th>
                    <th>
                      <DeleteOutlined
                        className="cursor-pointer"
                        onClick={() => equipDelete(dets?._id)}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DentalEquipment;
