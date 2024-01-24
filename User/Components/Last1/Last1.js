"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Last1.module.css";

// import required modules
import { Pagination } from "swiper/modules";
const Last1 = ({ data, imgLink }) => {
  return (
    <>
      <div className="h-[60vh] w-full  flex items-center py-10 justify-center ">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          loop={true}
          className="mySwiper"
        >
          {data?.map((dets, index) => (
            <SwiperSlide className={styles.swiperSlide}>
               <img
                  className="h-[64vh] object-contain"
                  src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                  alt=""
                />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Last1;
