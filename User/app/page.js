"use client";
import Footer from "@/Components/Footer/Footer";
import Nav from "@/Components/Nav/Nav";
import Page1 from "@/Components/Page1/Page1";
import Page2 from "@/Components/Page2/Page2";
import Page3 from "@/Components/Page3/Page3";
import MobileP4 from "@/Components/Page4/MobileP4";
import Page4 from "@/Components/Page4/Page4";
import Page5 from "@/Components/Page5/Page5";
import Page6 from "@/Components/Page6/Page6";
import Page7 from "@/Components/Page7/Page7";
import Page8 from "@/Components/Page8/Page8";
import ResFooter from "@/Components/ResFooter/ResFooter";
import Resswiper from "@/Components/Resswiper/Resswiper";
import { getHomePage } from "@/store/Action/others";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const page = () => {
  const { homepage, imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_API_KEY, {
    path: "/socket.io",
  });

  useEffect(() => {
    dispatch(getHomePage());
  }, []);
  useEffect(() => {
    // Establish a WebSocket connection

    // Listen for connection status (optional)
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("dataUpdate", (data) => {
      console.log("Received data from the server:", data, 489);
      // Update your React state or perform any other action here
    });
    // Listen for data updates
    // socket.on("consultationScheduled", () => {
    //   console.log("Consultation scheduled event received");
    //   // Update your Redux state or perform any other action here
    //   dispatch(getDoctors());
    // });

    // // Clean up the socket connection on component unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, [dispatch]);
  return (
    <div className="w-full relative overflow-hidden">
      <Nav />
      <Page1 data={homepage?.banner} imgLink={imgLink} />
      <MobileP4 />
      <Page2 />
      <Resswiper />
      <Page3 />
      <Page4 data={homepage?.health} imgLink={imgLink} />
      <Page5 data={homepage?.company} imgLink={imgLink} />
      <Page6 data={homepage?.review} imgLink={imgLink} />
      <Page7 data={homepage?.blogs} post={homepage?.posts} imgLink={imgLink} />
      <Page8 />
      <ResFooter />
      <Footer />
    </div>
  );
};

export default page;
