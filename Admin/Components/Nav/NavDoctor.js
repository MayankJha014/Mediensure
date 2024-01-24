"use client";
import {
  doctorLogout,
  getDoctor,
  getDoctorNotification,
  seenDoctorNotification,
  updateNowStatus,
} from "@/store/Action/Authentication";
import { clearmessage } from "@/store/Reducer/AdminReducer";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const NavDoctor = () => {
  const dispatch = useDispatch();
  const socket = io(process.env.NEXT_PUBLIC_REACT_SERVERURL, {
    path: "/socket.io",
  });

  const { doctor, message, loading, notificationNumber } = useSelector(
    (state) => state.adminReducer
  );
  const router = useRouter();
  useEffect(() => {
    dispatch(getDoctor());
    dispatch(getDoctorNotification());
    if (!socket.hasListeners("userconnect")) {
      socket.on("userconnect", (data) => {
        toast.success(data.message);
        dispatch(getDoctorNotification());
        playNotificationSound();
      });
      socket.emit("connection");
    }

    if (message) {
      toast.success(message);
      dispatch(clearmessage());
    }

    return () => {
      socket.off("userconnect");
    };
  }, [message]);
  const logout = () => {
    dispatch(doctorLogout());
  };
  const updateStatus = () => {
    dispatch(updateNowStatus());
  };
  const playNotificationSound = () => {
    const audio = new Audio("/bell.mp3");
    audio.play();
  };
  const notificationClick = () => {
    dispatch(seenDoctorNotification());
    router.push("/doctor/notification");
  };
  return (
    <>
      <div
        className="navbar bg-gray-100 border-2 shadow-md px-10"
        style={{
          height: "10vh",
        }}
      >
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <label className="swap mr-4 font-bold">
            <input type="checkbox" checked={doctor?.isAvailable} />
            <div className="swap-on">NOW</div>
            <div className="swap-off">TODAY</div>
          </label>
          <input
            type="checkbox"
            value="synthwave"
            onClick={updateStatus}
            className="toggle theme-controller toggle-success"
            checked={doctor?.isAvailable}
          />
          <button
            className="btn btn-ghost btn-circle"
            onClick={notificationClick}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item">
                {notificationNumber}
              </span>
            </div>
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={doctor?.avatar?.url}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavDoctor;
