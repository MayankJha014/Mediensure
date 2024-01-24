"use client";
import SideDoctor from "@/Components/Doctor/SidebarDoctor/SideDoctor";
import NavDoctor from "@/Components/Nav/NavDoctor";
import { getDoctorNotification } from "@/store/Action/Authentication";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
    const {notification} = useSelector((state)=>state.adminReducer);
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(getDoctorNotification());
    }, [])
    console.log(notification,45);
  return (
    <>
      <NavDoctor />
      <div className="w-full flex" style={{ height: "calc(100vh - 10vh)" }}>
        <SideDoctor />
        <div className="w-full p-10 flex flex-col">
          <div className="w-full text-center pb-10">
            <h1 className="text-4xl">Notifications</h1>
          </div>
          {
            notification?.map((dets,index)=>{
             return   <div className="chat chat-start">
                <div className="chat-bubble">
                  {dets?.message}
                </div>
                        </div>
            })
          }
     
        </div>
      </div>
    </>
  );
};

export default page;
