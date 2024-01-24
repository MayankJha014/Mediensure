// "use client";
// import Dashboard from '@/Components/Dashboard/Dashboard'
// import { getadmin } from '@/store/Action/Authentication';
// import { useRouter } from 'next/navigation';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';

// const page = () => {
//     const { message,error,isAuthenticated } = useSelector((state) => state.adminReducer);
//     const router = useRouter()
//     const dispatch = useDispatch()
//     useEffect(() => {
//       dispatch(getadmin())

//      if(!isAuthenticated){
//       router.push("/admin/Auth")
//      }
//     }, [isAuthenticated])

//   return (
//    <>
//    <Dashboard/>
//    </>
//   )
// }

// export default page
"use client";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import MyVideo from "@/Components/VideoSdk";
// import MyVideo from "@/Components/VideoSdk";

import { getImage, uploadImage } from "@/store/Action/Authentication";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import SariskaMediaTransport from "sariska-media-transport";

// SariskaMediaTransport.initialize();

const page = () => {
  const dispatch = useDispatch();
//   const token =  "279202c6befe19412737d5e33eeceec136c456fc88a1229f7cd1af2f";
//   const isNightly = true; 
// const connection = new SariskaMediaTransport.JitsiConnection(token, "asbsa", isNightly);

// //  set isNightly true for latest updates on the features else build will point to stable version

// connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, () => {
//   console.log('connection successful!!!',123);
// });
// if (typeof window === 'undefined') {
//   const fs = require('fs');
//   // Your server-side code using 'fs' here
// }
// connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, (error) => {
//   if (error  === SariskaMediaTransport.events.connection.PASSWORD_REQUIRED) { // token expired set again
//       connection.setToken(token) // set a new token
//       console.log('connection disconnect!!!', error,123);
//   }
// });

// connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED, (error) => {
//   console.log('connection disconnect!!!', error);
// });

// connection.connect();
  const { url } = useSelector((state) => state.adminReducer);
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.image.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    dispatch(uploadImage(formData));
  };

  // useEffect(() => {
  //   dispatch(getHomePage());
  // }, []);
  console.log(url, 456);
  return (
    <>
      <Nav />
      <div className="w-full flex " style={{height:"calc(100vh - 10vh)"}}>
        <Sidebar />
        <div className="w-full relative">
         {/* <MyVideo/> */}
        </div>

        {/* {imageUrl &&  <img className="h-40 w-40" src={`data:image/png;base64,${imageUrl}`} alt="" />} */}
        {/* <a href="http://localhost:8080/admin/get/image/9cdf76b8f896ec4fb257f7e2a9d4f22d2166b052">Click</a>
        <img className="h-96  object-contain"
          src={`http://localhost:8080/api/v1/admin/get/image/f5b0e2bcf018852f2c31fa47f96936b2c9d9ef14/image/png`}
          alt=""
        /> */}
      </div>
    </>
  );
};

export default page;
