"use client";
import { getOperator, getadmin } from "@/store/Action/Authentication";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const layout = ({ children }) => {
  const { isAuthenticatedOperator } = useSelector((state) => state.adminReducer);
  const router = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOperator())

    if (!isAuthenticatedOperator) router.push("/operation/login");
  }, []);

  return children;
};

export default layout;
