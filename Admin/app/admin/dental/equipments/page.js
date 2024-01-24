"use client";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { Select } from "antd";
import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import DentalEquipment from "@/Components/Dental/equipment/DentalEquipment";
import AddEquipment from "@/Components/Dental/equipment/AddEquipment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDentalEquipments } from "@/store/Action/others";
import { toast } from "react-toastify";
import { checkAdmin } from "@/store/Action/Authentication";
import Nav from "@/Components/Nav/Nav";
import { clearmessage } from "@/store/Reducer/AdminReducer";
const page = () => {
  const [open, setopen] = useState(false);
  const { imgLink, dentalEquipment } = useSelector((state) => state.others);
  
  const { loading, message,isAuthenticated } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDentalEquipments());
    if (message) {
      toast.success(message);
      dispatch(clearmessage())
    }
  }, [loading, message]);

  useEffect(() => {
    dispatch(checkAdmin());
  }, [isAuthenticated]);
  return (
    
    <>
    <Nav/>
      <div className="w-full flex" style={{ height: "calc(100vh - 10vh)" }}>
        <Sidebar />
        <div className="w-full relative overflow-y-auto">
          {open ? (
            <AddEquipment setOpen={setopen} />
          ) : loading ? (
            <div className="w-full relative h-full flex items-center justify-center">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <DentalEquipment
              equipmentdets={dentalEquipment}
              setopen={setopen}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
