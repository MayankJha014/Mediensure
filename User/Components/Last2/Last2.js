"use client";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const Last2 = (
  {data}
) => {
  const [value, setValue] = useState(2);
  return (
    <>
      <div className="h-fit flex items-center py-5 w-full px-28  ">
        <div className="h-fit w-fit items-start py-5 justify-start px-5 flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">{data?.name}</h1>
          <p className="w-[40vw] text-base">
         {data?.subname}
          </p>
          <div className="h-fit w-full flex flex-col gap-2  py-1">
            <div className="rating h-fit flex flex-col gap-1 ">
              <h1 className="text-lg">{data?.colour} </h1>

              <Typography component="legend"></Typography>
              <Rating
                name="simple-controlled"
                // value={value}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Last2;
