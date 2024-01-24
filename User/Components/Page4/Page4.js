import { Page4Data } from "@/db/Card";
import React, { useEffect } from "react";

const Page4 = ({ data, imgLink }) => {
  useEffect(() => {

  }, [data])
  
  return (
    <>
      <div className="h-72 w-full flex flex-col gap-4  pl-28 py-2  max-md:hidden">
        <h1 className="text-xl font-medium">Health Tips</h1>
        <div className=" h-full w-full  flex items-end pl-0 gap-4 ">
          {data?.map((dets, index) => (
            <div className="h-full w-48 bg-blue-400 " key={index}>
              <img
                className="h-full w-full object-contain"
                src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page4;
