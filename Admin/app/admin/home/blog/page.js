"use client";
import Sidebar from "@/Components/Sidebar/Sidebar";
import {
  changeStatusBlog,
  changeStatusPost,
  checkAdmin,
  deleteReview,
  uploadBlog,
  uploadImageComnpany,
} from "@/store/Action/Authentication";
import { getHomePage } from "@/store/Action/others";
import { AddCircleRounded } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "antd";

import { uploadPost } from "@/store/Action/Authentication";
import BlogDetail from "../post/BlogDetail";
import Nav from "@/Components/Nav/Nav";
const page = () => {
  const [img, setImg] = useState(null);
  const [active, setactive] = useState(false);
  const { loading,isAuthenticated } = useSelector((state) => state.adminReducer);
  const [isChecked, setIsChecked] = useState(false);
  const [content, setcontent] = useState("");
  const [heading, setheading] = useState("");
  const [selectedBlog, setselectedBlog] = useState("");
  const [detail, setdetail] = useState(false);
  const handleCheckboxChange = (id) => {
    dispatch(changeStatusBlog(id));
  };
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
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("content", content);
    dispatch(uploadBlog(formData));
    setcontent("");
    setheading("");
    setactive(false);
  };
  useEffect(() => {
    dispatch(getHomePage());
    dispatch(checkAdmin())
  }, [loading,isAuthenticated]);
  //   const handelReviewDelete = (id, imageId) => {
  //     dispatch(deleteReview(id, imageId));
  //   };
  const handleBlog = (dets) => {
    setdetail(true);
    setselectedBlog(dets);
  };
  return (
    <>
    <Nav/>
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
              <div className="w-full flex flex-col p-10 h-full overflow-y-auto overflow-x-hidden ">
                <h1 className="text-3xl font-bold">Posts</h1>
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
                    
                          <div className="form gap-3">
                            <label className="label">
                              <span className="label-text">
                                Heading of Post
                              </span>
                            </label>
                            <Textarea
                              color="neutral"
                              minRows={1}
                              placeholder="Type in here…"
                              size="lg"
                              variant="soft"
                              className="shrink-0 shadow-md"
                              value={heading}
                              onChange={(e) => setheading(e.target.value)}
                            />
                          </div>
                          <div className="form">
                            <label className="label">
                              <span className="label-text">
                                Content of Post
                              </span>
                            </label>
                            <Textarea
                              color="neutral"
                              minRows={5}
                              placeholder="Type in here…"
                              size="lg"
                              variant="soft"
                              className="shrink-0 shadow-md w-[60vw]"
                              value={content}
                              onChange={(e) => setcontent(e.target.value)}
                            />
                          </div>

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
                  ) : !detail ? (
                    <div className="flex flex-col items-start gap-5 w-full">
                      <Button
                        variant="contained"
                        className="bg-blue-500"
                        onClick={() => setactive(true)}
                      >
                        {" "}
                        <AddCircleRounded className="mr-4" /> Add Posts{" "}
                      </Button>
                      <div className="overflow-x- w-full">
                        <table className="table w-full">
                          {/* head */}
                          <thead>
                            <tr>
                              <th>Status</th>
                              {/* <th>Image</th> */}
                              <th>Heading</th>
                              <th>Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {homepage?.blogs?.map((dets, index) => (
                              <tr key={index}>
                                <th>
                                  <label>
                                    {console.log(dets?.shown,7456)}
                                    <input
                                      type="checkbox"
                                      className="toggle"
                                      onClick={() =>
                                        handleCheckboxChange(dets?._id)
                                      }
                                      checked={dets?.shown}
                                    />
                                  </label>
                                </th>
                            
                                <td>
                                  <div className="font-bold">
                                    {dets?.heading}
                                  </div>
                                </td>
                                <td>{dets?.date}</td>
                                <th>
                                  <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() => handleBlog(dets)}
                                  >
                                    details
                                  </button>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <BlogDetail dets={selectedBlog} setdetail={setdetail} />
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
