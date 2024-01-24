import { Slider } from "@mui/material";
import React from "react";

const Last4 = ({show}) => {
  return (
    <>
      <div className="h-fit w-full   flex px-28 pb-3 gap-10">
        <div className="h-fit flex flex-col rounded-xl border-2 shadow-black px-5 gap-9 py-5 w-full ">
          <div className="h-fit w-fit  flex flex-col gap-3">
            <h1 className="text-lg">Check Delivery Options</h1>

            <div className="h-fit w-fit   flex border-2 rounded-xl px-4 items-center justify-center">
              <input
                type="text"
                placeholder="Deliver to IN"
                className="input  flex py-2 border-none outline-none  rounded-xl text-sm input-bordered   "
              />

              <div className="h-fit w-fit">
                <h2 className="" style={{ color: "#ccb912" }}>
                  Change
                </h2>
              </div>
            </div>
          </div>

          <div className="h-fit w-fit  pb-7 flex flex-col gap-1">
            <div className="h-fit w-fit flex items-center gap-1 ">
              <img className="h-5" src="/truck.png" alt="" />
              <h1 className="text-sm" style={{ color: "#2a6193" }}>
                Get it by Wed, Nov 29
              </h1>
            </div>

            <div className="h-fit w-fit flex items-center gap-1 ">
              <img className="h-5" src="/pin.png" alt="" />
              <h1 className="text-sm" style={{ color: "#2a6193" }}>
                Get it by Wed, Nov 29
              </h1>
            </div>
          </div>
        </div>

        <div className="h-fit py-3 flex flex-col rounded-xl shadow px-5  border-2 gap-4  w-full ">
          <div className="h-fit w-full  flex items-center justify-between ">
            <h1 className="text-lg">Rating & Reviews</h1>
            <button
              className="w-fit   font-normal py-1 px-6 text-base   rounded-md"
              style={{ border: " 2px solid #567237", textColor: "567237" }}
            >
              RATE PRODUCT
            </button>
          </div>
          <div className="h-fit w-full flex items-center justify-center gap-5">
            <div className="h-fit w-fit ">
              <h1 className="" style={{ fontSize: "32px" }}>
                4.0★
              </h1>
            </div>
            <div className="h-32 w-1 bg-black"></div>

            <div className="h-fit w-full ">
              <div className=" h-fit  flex flex-col gap-1">
                <h1 className="gap-3 items-center justify-center flex">
                  5.0★
                  <Slider
                    className="w-full"
                    style={{ width: "100%", color: "#88d037" }}
                    size="small"
                    defaultValue={0}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                </h1>
                <h1 className="gap-3 items-center justify-center flex">
                  4.0★
                  <Slider
                    className="w-full"
                    style={{ width: "100%", color: "#88d037" }}
                    size="small"
                    defaultValue={0}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                </h1>
                <h1 className="gap-3 items-center justify-center flex">
                  3.0★
                  <Slider
                    className="w-full"
                    style={{ width: "100%", color: "#88d037" }}
                    size="small"
                    defaultValue={0}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                </h1>
                <h1 className="gap-3 items-center justify-center flex">
                  2.0★
                  <Slider
                    className="w-full"
                    style={{ width: "100%", color: "#88d037" }}
                    size="small"
                    defaultValue={0}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                </h1>
                <h1 className="gap-3 items-center justify-center flex">
                  1.0★
                  <Slider
                    className="w-full"
                    style={{ width: "100%", color: "#88d037" }}
                    size="small"
                    defaultValue={0}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                </h1>
              </div>
            </div>

            <div className="h-fit w-fit bg-red-500"></div>
          </div>
        </div>

        <div></div>
      </div>

      <div className="flex gap-7 justify-center items-center py-10">
        {/* <button
          className="w-fit   font-bold py-3 px-12  flex items-center justify-center gap-2 rounded-md"
          style={{ border: " 2px solid #567237", color: "#567237" }}
        >
          <img className="h-5" src="/heart.png" alt="" />
          WISHLIST
        </button> */}

        <button
        onClick={show}
          className="w-fit  text-white flex items-center justify-center gap-2 font-bold py-3 px-12  rounded-md bg-opacity-25"
          style={{ backgroundColor: "#567237" }}
        >
         CONTACT TO ORDER
        </button>
      </div>
    </>
  );
};

export default Last4;
