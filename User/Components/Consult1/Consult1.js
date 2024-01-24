"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/swiper-bundle.css";

import "./Styles.css";
import Link from "next/link";
const cardsdetails = [
  {
    img: "/gynceology.png",
    heading: "Gynaecology",
  },
  {
    img: "/sexology.png",
    heading: "Sexology",
  },
  {
    img: "/general.png",
    heading: "General physician",
  },
  {
    img: "/skin.png",
    heading: "Dermatology",
  },
  {
    img: "/psychiatry.png",
    heading: "Psychiatry",
  },
  {
    img: "/stomach.png",
    heading: "Stomach and digestion",
  },
  {
    img: "/children.png",
    heading: "Pediatrics",
  },
  {
    img: "/urology.png",
    heading: "Urology",
  },
];
const CustomNavigationButtons = () => {
  return (
    <div>
      <button className="prev-button1 text-2xl h-10 w-10 rounded-full bg-gray-300 absolute top-1/2 left-10 -translate-y-1/2">
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button className="next-button1 h-10 w-10 rounded-full bg-gray-300 absolute top-1/2 right-10 -translate-y-1/2">
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

const Consultation = () => {
  return (
    <>
      <div
        className="w-full h-fit pb-[10vw]"
        style={{ transform: "translateY(10vh)" }}
      >
        <div
          className="w-full h-[70vh] px-28 py-20 relative flex flex-col gap-4 "
          style={{ backgroundColor: "#8da473" }}
        >
          <h1 className="text-2xl font-semibold w text-white">
            Skip the travel! <br />
            Take Online Doctor Consultation
          </h1>
          <p className=" text-white">Lorem ipsum dolor sit amet.</p>

          <div className="flex flex-row  ">
            <div className="h-16 w-16  rounded-full  bg-black z-20"></div>
            <div className="h-16 w-16 rounded-full -ml-5 z-10 bg-white"></div>
            <div className="h-16 w-16 rounded-full -ml-5 bg-slate-400"></div>
          </div>

          <Link href={"/mediensure/consultdr"}>
            <button
              class="w-40 bg-white  text-white font-semibold py-2 px-4 rounded"
              style={{ color: "#8da473" }}
            >
              Consult Now
            </button>
          </Link>

          <img
            className="h-[78%] w-[75%] object-contain bottom-0 right-0  absolute left-96 "
            src="/aunt.png"
            alt=""
          />
        </div>
        <div className="flex flex-col w-fullp-4 p-8 gap-3">
          <div className="h-fit w-full   flex justify-between px-16  items-center">
            <div className="h-fit w-fit ">
              <h1 className="text-xl ml-16 font-semibold">25+ Specialities</h1>
              <h3 className="text-base ml-16 font-normal">
                Consult with top doctors across specialities
              </h3>
            </div>

            <Link href={"/mediensure/specialties"}>
              <button class="bg-transparent  border-2 shadow  font-normal py-1 text-sm px-8 rounded">
                See all Specialities
              </button>
            </Link>
          </div>

          <div className="flex flex-col relative w-full mt-6">
            <Swiper
              slidesPerView={6}
              spaceBetween={20}
              navigation={{
                prevEl: ".prev-button1", // Selector for the previous button
                nextEl: ".next-button1", // Selector for the next button
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {cardsdetails?.map((dets, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full shrink-0 h-full border-2  gap-2 flex flex-col items-center justify-center shadow-lg"
                >
                  <div className="flex rounded-full p-4 bg-gray-200  h-fit w-24">
                    <img className=" object-contain" src={dets.img} alt="" />
                  </div>
                  <h1 className="text-base font-semibold">{dets?.heading}</h1>
                  <h3 className=" w-full text-xs" style={{ color: "#8da473" }}>
                    Consult now <i class="ri-arrow-right-s-line"></i>
                  </h3>
                </SwiperSlide>
              ))}
            </Swiper>
            <CustomNavigationButtons />
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultation;
