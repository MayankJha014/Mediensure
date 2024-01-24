"use client";
import { getadmin } from "@/store/Action/Authentication";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.adminReducer);
  const router = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getadmin())

    if (!isAuthenticated) router.push("/");
  }, []);

  return children;
};

export default layout;
