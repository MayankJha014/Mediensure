"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const Page5 = ({ data, imgLink }) => {
  return (
    <>
      <div className="h-64 max-md:h-28  md:pt-10 w-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl  font-medium" style={{ color: "#3f7106" }}>
          TRUST BY THE BEST{" "}
        </h1>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper  flex items-center"
        >
          {data?.map((dets, index) => (
            <SwiperSlide className="p-[4vw]" key={index}>
              <img
                className=""
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

export default Page5;
