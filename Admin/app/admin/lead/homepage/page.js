"use client"
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { getLeads } from "@/store/Action/Authentication";
import { Box, CircularProgress } from "@mui/material";
import { Breadcrumb } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const {homeLeads,loading,message} = useSelector((state)=>state.adminReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLeads())
  }, [])
  // const formattedHomepage = homepage.map((lead) => ({
  //   ...lead,
  //   Date:,
  //   Time: new Date(lead.createdAt).toLocaleTimeString(),
  // }));

  // const formattedProvider = provider.map((lead) => ({
  //   ...lead,
  //   Date: new Date(lead.createdAt).toLocaleDateString(),
  //   Time: new Date(lead.createdAt).toLocaleTimeString(),
  // }));
  console.log(homeLeads,413);
  return (
    <>
      <Nav />
      <div className="w-full flex" style={{ height: "calc(100vh - 10vh)" }}>
        <Sidebar />
        {
            loading ?    <div className="w-full relative h-full flex items-center justify-center">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div> :
            <div className="w-full p-10">
        
            <Breadcrumb
              className="cursor-pointer"
              items={[
                {
                  title: "Leads",
                },
                {
                  title: "Homepage",
                },
              ]}
            />
            <div className="overflow-x- w-full p-10">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>Phone no.</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {homeLeads?.map((dets, index) => (
                    <tr key={index} className="text-gray-500 font-medium">
                      <th>{dets?.data?.number}</th>
                      <th>
                        { new Date(dets?.createdAt).toLocaleDateString()}
                      </th>
                      <th>{new Date(dets?.createdAt).toLocaleTimeString()}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          }
      
      </div>
    </>
  );
};

export default page;
