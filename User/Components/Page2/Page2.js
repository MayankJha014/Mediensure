"use client";
import { cardData, eyeData, ivfData } from "@/db/Card";
import { colors } from "@mui/material";
import Link from "next/link";
import React from "react";

const Page2 = () => {
  return (
    <div
      className="h-fit w-full flex flex-col items-start justify-center    gap-8    py-5   max-md:h-fit "
      style={{ paddingLeft: "10vw" }}
    >
      <div className=" w-fit  gap-6 flex    flex-col items-start justify-start max-md:w-full">
        <h1
          className="text-lg max-md:text-lg font-medium"
          style={{ color: "#3f7106" }}
        >
          Dental Care
        </h1>
        <div className="flex items-start gap-10 justify-center">
          {cardData?.map((dets, index) => (
            <>
              <Link href={`${dets?.link}`}>
                <div
                  key={index}
                  className=" rounded-lg max-md:p-2 py-5 px-4 w-44 max-md:w-24 max-md:h-32 text-black flex-shrink-0 relative overflow-hidden items-center justify-center flex flex-col gap-3 bg-white shadow-md border-2"
                >
                  <img
                    src={dets?.img}
                    className="h-32 max-md:h-40 w-fit"
                    alt=""
                  />
                  <h1 className="max-md:text-xs  max-md:w-full">
                    {dets?.name}
                  </h1>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>

      <div className=" w-fit  gap-4 flex flex-col items-start justify-start max-md:w-full">
        <h1
          className="text-lg max-md:text-lg font-medium "
          style={{ color: "#49642b" }}
        >
          IVF
        </h1>
        <div className="flex items-start gap-10  justify-center">
          {ivfData?.map((dets, index) => (
            <>
          <Link href={`/mediensure/${dets?.link}`}>
          <div
                key={index}
                className=" rounded-lg max-md:p-2 max-md:w-24 max-md:h-32 py-5 px-4 w-44 flex-shrink-0 text-black relative overflow-hidden items-start justify-center flex flex-col gap-3 shadow-md border-2 bg-white"
              >
                <img
                  src={dets?.img}
                  className="h-32 max-md:h-40 w-fit "
                  alt=""
                />
                <h1 className="max-md:text-xs max-md:w-full whitespace-nowrap text-left">
                  {dets?.name}
                </h1>
                {dets?.name === "Service" ? (
                  <>
                    <span></span>
                    <span></span>
                  </>
                ) : (
                  ""
                )}
              </div>
          </Link>
            </>
          ))}
        </div>
      </div>

      <div className=" w-fit  gap-4 flex   flex-col items-start justify-start max-md:w-full max-md:pl-0">
        <h1 className="text-lg font-medium" style={{ color: "#3f7106" }}>
          Eye Care
        </h1>
        <div className="flex items-start gap-10 justify-center ">
          {eyeData?.map((dets, index) => (
            <>
              <Link href={`${dets?.link}`}>
                <div
                  key={index}
                  className=" max-md:w-24 max-md:h-32 rounded-lg py-5 px-4 w-44  text-black relative overflow-hidden items-center justify-center flex flex-col gap-3 bg-white shadow-md border-2"
                >
                  <img
                    src={dets?.img}
                    className="h-32 max-md:h-40 w-fit"
                    alt=""
                  />
                  <h1 className="max-md:text-xs max-md:w-full  text-left">
                    {dets?.name}
                  </h1>
                  {dets?.name === "Basic eye test" ? <> </> : ""}
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page2;
