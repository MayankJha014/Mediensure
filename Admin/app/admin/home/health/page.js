"use client";
import Sidebar from "@/Components/Sidebar/Sidebar";
import {
  checkAdmin,
    deleteHealth,
  deleteHomePage,
  uploadImageComnpany,
  uploadImageHealth,
} from "@/store/Action/Authentication";
import { getHomePage } from "@/store/Action/others";
import { Button } from "@mui/material";
import { Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Nav from "@/Components/Nav/Nav";
const page = () => {
  const [img, setImg] = useState(null);

  const { imgLink, homepage } = useSelector((state) => state.others);
  const { loading,message,isAuthenticated } = useSelector((state) => state.adminReducer);
  const { load } = useSelector((state) => state.others);
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
    dispatch(uploadImageHealth(formData));
    setImg("");
  };
  useEffect(() => {
    dispatch(getHomePage());
  }, [loading,isAuthenticated]);

  const handelCompanyDelete = (id, imageId) => {
    console.log(id, imageId);
    dispatch(deleteHealth(id, imageId));
    dispatch(checkAdmin())
  };
  console.log(loading);
  return (
    <>
    <Nav/>
      <div className="w-full h-[90vh] relative overflow-hidden ">
        <div className="w-full flex relative overflow-hidden " style={{ height: "calc(100vh - 10vh)" }}>
          <Sidebar />
          {loading || load ? (
            <div className="w-full relative h-full flex items-center justify-center">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <div className="w-full flex flex-col p-10 h-full relative overflow-x-hidden overflow-y-auto">
              <h1 className="text-3xl font-bold">Health Image</h1>
              <div className="w-full relative p-10 flex flex-col items-start justify-center ">
                <div className="form-control w-full max-w-xs">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <label className="label">
                      <span className="label-text">Select Comapny Image</span>
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="file-input file-input-bordered w-full max-w-xs"
                      name="image"
                    />
                    <div className="flex flex-col gap-4 p-4 items-center justify-center">
                      {img && <img src={img} alt="Selected Image" />}
                      <div className="flex gap-2">
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
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {homepage?.health?.length > 0 &&
                    homepage?.health?.map((dets, index) => (
                      <div
                        className="flex shrink-0 h-fit w-fit p-2 flex-col border-2"
                        key={index}
                      >
                        <i
                          className="ri-close-circle-fill text-red-500 text-xl cursor-pointer"
                          onClick={() =>
                            handelCompanyDelete(dets?.uid, dets?._id)
                          }
                        ></i>
                        <img
                          className="h-fit shrink-0  object-contain w-fit  "
                          src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                          alt=""
                        />
                      </div>
                    ))}
                </div>
         

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
    </>
  );
};

export default page;
