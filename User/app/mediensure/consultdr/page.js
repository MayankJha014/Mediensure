"use client";
import Consultdr1 from "@/Components/Consultdr1/Consultdr1";
import Footer from "@/Components/Footer/Footer";
import Nav from "@/Components/Nav/Nav";
import Loading from "@/Components/loading";
import { getDoctors } from "@/store/Action/others";
import { removeErr, removeMsg } from "@/store/Reducer/auth";
import { Button } from "@mui/material";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const page = () => {
  const { Doctor, imgLink, percentage } = useSelector((state) => state.others);
  const { message, loading, error } = useSelector((state) => state.auth);
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_API_KEY, {
    path: "/socket.io",
  });
  const [d, setd] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(removeMsg());
    }
    if (error) {
      toast.error(error);
      dispatch(removeErr());
    }
  }, [message, error, loading]);
  // const click = () => {
  //   const data = {message:"Hello Socket is connected Successfully"}
  //   socket.emit("userconnect",data);
  console.log(percentage, 469);
  // };
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <Consultdr1 doctor={Doctor} percentage={percentage} imgLink={imgLink} />
      )}
      {/* <Button onClick={click}>CLICK ME {d}</Button> */}
      <Footer />
    </>
  );
};

export default page;
