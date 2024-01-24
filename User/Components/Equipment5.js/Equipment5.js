"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Equipment.module.css";

// import required modules
import { Pagination } from "swiper/modules";

const Equipment5 = ({ data }) => {
  return (
    <>
      {/* <div className='h-fit w-full flex flex-col py-5 px-10 gap-10 items-center  '>
<button class="w-fit  text-white font-bold py-2 px-16  rounded-xl" style={{backgroundColor:"#567237"}}>
  Show More
</button>

<div className='h-[50vh] w-full  pb-4'>


<Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className={styles.swiperslide2}>

          <h1 className='font-medium text-4xl'>What Our Clients are Saying</h1>

          <p className='text-2xl w-[42vw] mt-5'>Excellent customer service and competitive prices. Will definitely order again.</p>
          <h1>-Lakmi Rathore</h1>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
   
      </Swiper>
    
   
</div>
</div> */}

      <div className="h-fit w-full flex flex-col py-5 px-10 gap-10  max-md:gap-1 items-center  ">
        <button
          class="w-fit  text-white font-bold py-2 px-16  rounded-xl"
          style={{ backgroundColor: "#567237" }}
        >
          Show More
        </button>

        <div className="h-[50vh] w-full flex flex-col items-center justify-between py-14 max-md:h-[25vh]">
          <h1 className="font-medium text-4xl max-md:text-xl">
            What Our Clients are Saying
          </h1>

          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={styles.swiperequip}
          >
            {data?.map((dets, index) => (
              <SwiperSlide key={index} className={styles.swiperslide2}>
                <p className="text-2xl w-[42vw] mt-5 max-md:text-xs max-md:w-[100vw]">
                 {dets?.description}
                </p>
                <h1>-{dets?.by}</h1>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Equipment5;
