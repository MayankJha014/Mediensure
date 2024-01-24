"use client";
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import Nav from "../Nav/Nav";

// import 'remixicon/fonts/remixicon.css';
export const metadata = {
  title: "Login | Student",
};
const Wrapper = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <div className="w-full h-screen relative overflow-hidden">
          {children}
        </div>
      </Provider>
    </>
  );
};

export default Wrapper;
