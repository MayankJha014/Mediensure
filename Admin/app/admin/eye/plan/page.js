"use client";
import Banner from "@/Components/Dental/Banner";
import Inclusion from "@/Components/Dental/Inclusion";
import Plan from "@/Components/Dental/Plan";
import EyeBanner from "@/Components/EyeCare/EyeBanner";
import EyeInclusion from "@/Components/EyeCare/EyeInclusion";
import EyePlan from "@/Components/EyeCare/EyePlan";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import {
  checkAdmin,
  deleteDentalInclusion,
  deleteDentalPlan,
} from "@/store/Action/Authentication";
import { getDental, getEyeCare } from "@/store/Action/others";
import { clearmessage } from "@/store/Reducer/AdminReducer";
import { DeleteOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const [banner, setbanner] = useState(false);
  const [plan, setplan] = useState(false);
  const [inclusion, setinclusion] = useState(false);
  const { imgLink, eyeCare } = useSelector((state) => state.others);
  const { loading, message ,isAuthenticated} = useSelector((state) => state.adminReducer);
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEyeCare());

    if (message) {
      toast.success(message);
      dispatch(clearmessage());
    }
  }, [loading, message]);
  const deletePlan = (id) => {
    dispatch(deleteDentalPlan(id));
  };
  const deleteInclusion = (id) => {
    dispatch(deleteDentalInclusion(id));
  };


  useEffect(() => {
    dispatch(checkAdmin());
  }, [isAuthenticated,eyeCare]);
  return (
    <>
    <Nav/>
      <div
        className="w-full bg-gray-100 flex  relative overflow-hidden"
        style={{ height: "calc(100vh - 10vh)" }}
      >
        <Sidebar />
        {banner ? (
          <EyeBanner setbanner={setbanner} />
        ) : plan ? (
          <EyePlan setopen={setplan} />
        ) : inclusion ? (
          <EyeInclusion setopen={setinclusion} />
        ) : loading ? (
          <div className="w-full relative h-full flex items-center justify-center">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <div className="w-full relative overflow-x-hidden overflow-y-auto p-10 ">
            <div className="w-full flex flex-col gap-3 items-start justify-center">
              <Button
                variant="contained"
                className="bg-blue-500"
                onClick={() => setbanner(true)}
              >
                Add Banner
              </Button>
              {eyeCare?.banner?.filename ? (
                <img
                  src={`${imgLink}/${eyeCare?.banner?.filename}/${eyeCare?.banner?.mimetype}`}
                  className="object-contain h-[50vh] w-full"
                  alt=""
                />
              ) : (
                <div className="skeleton w-full h-[50vh]"></div>
              )}
            </div>
            <div className="h-fit w-full flex flex-col py-5 gap-3 items-center justify-center">
              <h1 className="text-xl font-semibold flex justify-center py-5 ">
                Our Plans And Packages
              </h1>
              <Button
                className="bg-blue-500 w-fit"
                variant="contained"
                onClick={() => setplan(true)}
              >
                Add Plans & Package
              </Button>
              <div className="w-full h-fit grid grid-cols-3  px-24 py-3 gap-5 place-content-center place-items-center  ">
                {eyeCare?.plans?.map((dets, index) => (
                  <div
                    key={index}
                    className="h-fit w-56 bg-white items-center justify-center py-10   relative    flex flex-col  gap-1 rounded-2xl border-2 shadow-md "
                    style={{ color: "#567237" }}
                  >
                    <h1 className="text-base font-medium">{dets?.plan}</h1>
                    <h2 className="text-3xl font-bold">Rs.{dets?.price}</h2>
                    <button
                      class=" text-white font-bold py-2 px-10 rounded-2xl mt-2"
                      style={{ backgroundColor: "#567237" }}
                    >
                      Buy Now
                    </button>
                    <div
                      onClick={() => deletePlan(dets?.id)}
                      className="flex h-8 w-8 bg-red-500 rounded-full absolute cursor-pointer top-0 right-0 text-white items-center justify-center"
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full  flex flex-col px-20 py-12">
              <Button
                className="bg-blue-500 w-fit"
                variant="contained"
                onClick={() => setinclusion(true)}
              >
                Add Inclusion
              </Button>
              {eyeCare?.inclusion?.map((dets, index) => (
                <div
                  className="h- w-full py-8 px-10 flex gap-2  rounded-xl mt-10 relative"
                  style={{ backgroundColor: "#eaeaea" }}
                  key={index}
                >
                  <div className="h-fit w-[30%] shrink-0 ">
                    <img
                      src={`${imgLink}/${dets?.img?.filename}/${dets?.img?.mimetype}`}
                      alt=""
                    />
                  </div>

                  <div className="h-fit w-fit">
                    <div className="h-fit w-[56vw] flex">
                      <div className="h-48 w-1/2  px-6">
                        <h1 className="text-2xl font-semibold">Inclusions:</h1>
                        <div className="h-40 w-full flex  flex-col items-start justify-start  py-5 gap-3 ">
                          {dets?.points?.map((i, ind) => (
                            <div className="h-fit w-fit flex " key={ind}>
                              <img className="h-4" src="/tick.png" alt="" />
                              <h1 className="text-xs">{i}</h1>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="h-48 w-1/2  flex flex-col gap-1 px-9 py-24">
                        <h1 className="text-4xl font-bold">
                          Rs {dets?.price}/-
                        </h1>
                        <h2 className="font-bold">*Plus Taxes</h2>
                      </div>
                    </div>
                    <button
                      class=" text-white font-bold py-2 px-36 ml-28 rounded-2xl mt-2"
                      style={{ backgroundColor: "#567237" }}
                    >
                      Buy Now
                    </button>
                  </div>
                  <div
                    onClick={() => deleteInclusion(dets?.img?._id)}
                    className="flex h-8 w-8 bg-red-500 rounded-full absolute cursor-pointer top-0 right-0 text-white items-center justify-center"
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
