"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Image, Modal, Typography } from "antd";
import { DeleteOutlined } from "@mui/icons-material";
import { Pagination } from "swiper/modules";
import styles from "./Dental.module.css";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";

const EquipmentDetail = ({ equipment,setOpen }) => {
  const { imgLink } = useSelector((state) => state.others);
  return (
    <>
      <div className="flex flex-col w-full p-10">
      <i
          className="ri-arrow-left-line text-2xl cursor-pointer"
          onClick={() => setOpen(false)}
        ></i>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={styles.swiper2}
        >
          {equipment?.img?.map((dets, index) => (
            <SwiperSlide className={styles.swiperSlide} key={index}>
              <Image
                src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                className="h-full object-contain"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="h-fit flex items-center  px-[8vw]">
          <div className="h-fit w-fit items-start py-5 justify-start gap-2  flex  flex-col">
            <h1 className="text-5xl font-bold">{equipment?.name}</h1>
            <p className=" text-base">{equipment?.subname}</p>
            <div className="h-fit w-full flex flex-col gap-2  py-1">
              <div className="rating h-fit flex flex-col gap-1 ">
                <h1 className="text-lg">{equipment?.colour}</h1>

                {/* <Typography component="legend"></Typography> */}
                <Rating value={equipment?.Rating} disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit w-full flex flex-col px-[8vw]">
          <div className="h-fit w-full ">
            <div className="h-fit w-fit flex items-center justify-center gap-14">
              <h1 className="text-3xl font-normal" style={{ color: "#567237" }}>
                Description
              </h1>
              {/* <div className='w-10 absolute  top-10 left-8'style={{color:"#567237",height:"12px"}}></div> */}

              <h1 className="text-3xl font-normal">Details</h1>
              <h1 className="text-3xl font-normal">Reviews</h1>
            </div>

            <div className="h-fit w-full flex flex-col items-start  gap-1 p-5 ">
              {equipment?.description?.map((dets, index) => (
                <h1 className="font-medium text-sm" key={index}>
                  {dets}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentDetail;
