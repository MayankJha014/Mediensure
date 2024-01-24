"use client";
import { getDoctor, getadmin } from "@/store/Action/Authentication";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const layout = ({ children }) => {
  const { isAuthenticatedDoctor } = useSelector((state) => state.adminReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctor());
      if (!isAuthenticatedDoctor) router.push("/doctor/register");

  }, [isAuthenticatedDoctor]);

  return children;
};

export default layout;
