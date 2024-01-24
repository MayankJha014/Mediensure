"use client"
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { getLeads } from "@/store/Action/Authentication";
import { Box, CircularProgress } from "@mui/material";
import { Breadcrumb } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const {providerLeads,loading,message,ivf} = useSelector((state)=>state.adminReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLeads())
  }, [])
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
                  title: "Provider",
                },
              ]}
            />
            <div className="overflow-x- w-full p-10">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>City</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ivf?.map((dets, index) => (
                    <tr key={index} className="text-gray-500 font-medium">
                      <th>{dets?.data?.name}</th>
                      <th>{dets?.data?.email}</th>
                      <th>{dets?.data?.contact}</th>
                      <th>{dets?.data?.city}</th>
                      <th>
                        { new Date(dets?.createdAt).toLocaleDateString()}
                      </th>
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
