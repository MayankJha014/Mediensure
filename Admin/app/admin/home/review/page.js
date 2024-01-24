"use client";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import {
  checkAdmin,
  deleteReview,
  uploadImageComnpany,
  uploadReview,
} from "@/store/Action/Authentication";
import { getHomePage } from "@/store/Action/others";
import { AddCircleRounded } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const [img, setImg] = useState(null);
  const [active, setactive] = useState(false);
  const { loading, isAuthenticated } = useSelector(
    (state) => state.adminReducer
  );

  const [review, setreview] = useState("");
  const { imgLink, homepage, load } = useSelector((state) => state.others);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
    }
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.image.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("text", review);
    dispatch(uploadReview(formData));
    setImg("");
    setreview("");
    setactive(false);
  };
  useEffect(() => {
    dispatch(getHomePage());
    dispatch(checkAdmin());
  }, [loading, isAuthenticated]);
  const handelReviewDelete = (id, imageId) => {
    dispatch(deleteReview(id, imageId));
  };
  return (
    <>
      <Nav />
      <div className="w-full ">
        <div className="w-full flex" style={{ height: "calc(100vh - 10vh)" }}>
          <Sidebar />
          <div className="w-full flex">
            {loading || load ? (
              <div className="w-full relative h-full flex items-center justify-center">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              <div className="w-full flex flex-col p-10">
                <h1 className="text-3xl font-bold">
                  What our users said about us
                </h1>
                <div className="w-full relative p-10 flex flex-col items-start justify-center ">
                  {active ? (
                    <div className="flex flex-col items-start">
                      <i
                        className="ri-arrow-left-line text-2xl cursor-pointer"
                        onClick={() => setactive(false)}
                      ></i>
                      <div className="form-control w-full ">
                        <form
                          onSubmit={(e) => handleSubmit(e)}
                          className="flex w-fit gap-10 p-10 flex-col"
                        >
                          <div className="flex items-center justify-center w-fit shrink-0">
                            <div className="flex flex-col">
                              <label className="label">
                                <span className="label-text">
                                  Select Review User Image
                                </span>
                              </label>
                              <input
                                type="file"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered w-full max-w-xs"
                                name="image"
                              />
                            </div>

                            <div className="flex flex-col gap-4 p-4 items-center justify-center">
                              {img && (
                                <img
                                  src={img}
                                  alt="Selected Image"
                                  width={"100px"}
                                />
                              )}
                              {/* <div className="flex gap-2">
                          {img && (
                            <>
                              <Button
                                variant="contained"
                                onClick={() => setImg("")}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete Image
                              </Button>
                              <Button
                                variant="contained"
                                type="submit"
                                className="bg-blue-500"
                              >
                                Submit Image
                              </Button>
                            </>
                          )}
                        </div> */}
                            </div>
                          </div>
                          <Textarea
                            color="neutral"
                            minRows={2}
                            placeholder="Type in here…"
                            size="lg"
                            variant="soft"
                            className="shrink-0 shadow-md"
                            value={review}
                            onChange={(e) => setreview(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            className="bg-blue-500 w-fit"
                            type="submit"
                          >
                            {" "}
                            Submit{" "}
                          </Button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-5">
                      <Button
                        variant="contained"
                        className="bg-blue-500"
                        onClick={() => setactive(true)}
                      >
                        {" "}
                        <AddCircleRounded className="mr-4" /> Add Review{" "}
                      </Button>
                      <div className="flex gap-2 flex-wrap">
                        {homepage?.review &&
                          homepage?.review?.map((dets, index) => (
                            <div
                              className="flex shrink-0 h-fit w-fit p-2 flex-col "
                              key={index}
                            >
                              <i
                                className="ri-close-circle-fill text-red-500 text-3xl cursor-pointer"
                                onClick={() =>
                                  handelReviewDelete(dets?.uid, dets?._id)
                                }
                              ></i>
                              <div
                                className="h-[30vh]  w-72 rounded-bl-2xl relative gap-5 flex flex-col pt-4 px-6 items-start rounded-tr-2xl  "
                                style={{ backgroundColor: "#8da473" }}
                              >
                                <p className="text-white text-sm  h-full ">
                                  {dets?.text}
                                </p>
                                <div className="h-16 w-16 rounded-full absolute left-1/2 -bottom-[15%] -translate-x-1/2 object-contain  bg-black">
                                  <img
                                    src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {/* {
      <img className="h-[50vh]  object-contain"
            src={`${imgLink}/35b96c3bc344f741a1d8d6168d6b6c1e38c3a84e/image/png`}
            alt=""
          />
          }
       */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
