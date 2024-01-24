"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import styles from "./Consulting4.module.css";
// import required modules
import { Navigation } from "swiper/modules";

const CustomNavigationButtons = () => {
  return (
    <div className="absolute top-1/2 px-20 -translate-y-1/2 w-full h-[10vh] z-20 flex justify-between">
      <button className="prev-button2 text-2xl max-md:h-6 max-md:w-6 max-md:text-xs max-md:hidden  h-10 w-10 rounded-full bg-gray-300 ">
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button className="next-button2 h-10 w-10 rounded-full max-md:hidden bg-gray-300 ">
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

const Cosnulting4 = ({ data, imgLink }) => {
    useEffect(() => {
   
    }, [data,imgLink])
    
  return (
    <>
      <div
        className="h-screen w-full flex flex-col items-center justify-center py-10 relative  max-md:h-[40vh]  max-md:py-4"
        style={{ background: "linear-Gradient(#7a9062,#98a787)" }}
      >
        <h1 className="text-4xl font-medium text-white max-md:hidden">
          WHAT OUR CLIENTS SAYS ABOUT US
        </h1>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev-button2", // Selector for the previous button
            nextEl: ".next-button2", // Selector for the next button
          }}
          className="mySwiper"
        >
          {data?.map((dets, index) => (
            <SwiperSlide className={styles.swiperSlide3} key={index}>
              <div className="h-28 w-28 max-md:h-16 max-md:w-16 rounded-full relative overflow-hidden bg-black">
                <img
                  className="object-cover h-full w-full"
                  src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                  alt=""
                />
              </div>
              <p className="text-base max-md:text-xs font-normal w-[65vw] max-md:w-full">
                {'"'}
                {dets?.description}
                {'"'}
              </p>

              <div className="w-[80vw] h-[2px] bg-white"></div>
              <h2 className="text-xl font-semibold">-{dets?.name}-</h2>
            </SwiperSlide>
          ))}
        </Swiper>
        <CustomNavigationButtons />
      </div>
      
    </>
  );
};

export default Cosnulting4;
