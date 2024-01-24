"use client";
import React from "react";
import { useSelector } from "react-redux";

const BlogDetail = ({ dets,setdetail }) => {
  const { imgLink } = useSelector((state) => state.others);
  return (
    <>
    
      <div className="flex flex-col gap-4">
        <i
          className="ri-arrow-left-line text-3xl cursor-pointer"
          onClick={() => setdetail(false)}
        ></i>
        <div className="w-full flex flex-col border-2 p-2 rounded-xl gap-5 items-start justify-start">
          <h1 className="font-bold text-5xl">{dets?.heading}</h1>
          {
            dets?.filename &&  <img
            className="h-[20vw] w-[20vw] object-contain "
            src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
            alt=""
          />
          }
         
          <p>{dets?.content}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
