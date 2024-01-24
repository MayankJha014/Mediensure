"use client";
import IVFAddReview from "@/Components/Admin/IVF/IVFAddReview";
import IVFBanner from "@/Components/Admin/IVF/IVFBanner";
import IVFNetwork from "@/Components/Admin/IVF/IVFNetwork";
import IVFReview from "@/Components/Admin/IVF/IVFReview";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { deleteIvfReview } from "@/store/Action/Authentication";
import { getHomePage } from "@/store/Action/others";
import { clearmessage } from "@/store/Reducer/AdminReducer";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const { loading, message } = useSelector((state) => state.adminReducer);
  const { homepage, imgLink } = useSelector((state) => state.others);
  const [banner, setbanner] = useState(false);
  const [review, setreview] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomePage());
    if (message) {
      toast.success(message);
      dispatch(clearmessage());
    }
  }, [message, loading]);
const handleReviewDelete = (id)=>{
dispatch(deleteIvfReview(id))
}
  return (
    <>
      <Nav />
      <div
        className="w-full flex relative "
        style={{ height: "calc(100vh - 10vh)" }}
      >
        <Sidebar />
        <div className="w-full h-full p-10 flex flex-col gap-5 overflow-y-auto overflow-x-hidden relative">
          {loading ? (
            <div className="w-full relative h-full flex items-center justify-center">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : banner ? (
            <IVFBanner setopen={setbanner} />
          ) : review ? (
            <IVFAddReview  setopen={setreview} />
          ) : (
            <>
              <IVFNetwork
                data={homepage?.ivfBanner}
                imgLink={imgLink}
                setopen={setbanner}
              />
              <IVFReview deleteReview= {handleReviewDelete} setopen={setreview} data={homepage?.ivfReview} imgLink={imgLink}/>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
