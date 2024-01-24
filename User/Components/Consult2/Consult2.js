
"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import  "../Consult1/Styles.css";

import { Navigation } from "swiper/modules";
const cardsdetails = [
  {
  img:"/wc.png",
  heading:" Cough & Cold?"
},
{
  img:"/bell.png",
  heading:"Period Problems"
},
{
  img:"/check.png",
  heading:"Eye Problem?"
},
{
  img:"/eyes.png",
  heading:"Skin Problems?"
},
{
  img:"/eyes.png",
  heading:"Skin Problems?"
},


]
const CustomNavigationButtons = () => {
 
  return (
    <div>
      <button className="prev-button2 text-2xl h-10 w-10 rounded-full bg-gray-300 absolute top-1/2 left-10 -translate-y-1/2">
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button className="next-button2 h-10 w-10 rounded-full bg-gray-300 absolute top-1/2 right-10 -translate-y-1/2">
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

const Consult2 = () => {
  return (
    <>
    <div className='h-fit w-full  '>
    <div className="flex flex-col relative w-full mt-6">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={{
              prevEl: ".prev-button2", // Selector for the previous button
              nextEl: ".next-button2", // Selector for the next button
            }}
            modules={[Navigation]}
            className="mySwiper2"
          >
            {cardsdetails?.map((dets,index)=>(
 <SwiperSlide key={index} className="w-full rounded-t-xl shrink-0 h-full border-2  gap-2 flex flex-col items-center justify-center shadow-lg">
 <div className="flex  p-4    ">
 <img className=" object-contain  h-36  "  src={dets.img} alt="" />

 </div>
 <h1 className="text-base font-semibold">{dets?.heading}</h1>
 <h3 className=" w-full text-xs" style={{color:"#8da473"}}>Consult now <i class="ri-arrow-right-s-line"></i></h3>
</SwiperSlide>
            ))}
           
        

          </Swiper>
          <CustomNavigationButtons />
        </div>
    </div>
    </>
  )
}

export default Consult2