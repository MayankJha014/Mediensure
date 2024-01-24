"use client";
import { getDoctorAppointment } from "@/store/Action/Authentication";
import { Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Prescription from "./Prescription";
import Link from "next/link";

const Appointment = ({ setId }) => {
  const dispatch = useDispatch();
  const { loading, appointment } = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(getDoctorAppointment());
  }, []);
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tele Id</th>
              <th>Patient Name</th>
              <th>Date & Time</th>
              <th>Prescription</th>
              <th>Call</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointment?.map((dets, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{dets?.tele}</td>
                <td>{dets?.patient?.name}</td>
                <td>
                  {dets?.date} & {dets?.time}
                </td>
                <td>
                  {dets?.prescription ? (
                    <Link href={`/doctor/prescription/${dets?.prescription?._id}`}>
                          <Tag
                      color={"green"}
                      style={{ display: "flex", width: "fit-content" }}
                      className="p-2 cursor-pointer hover:bg-green-200"
                    >
                      Submited{" "}
                      <img
                        className="h-5 w-5 object-contain"
                        src="/prescription.png"
                        alt=""
                      />
                    </Tag>
                    </Link>
              
                  ) : (
                    <Tag
                      onClick={() => setId(dets?._id)}
                      color={"cyan"}
                      style={{ display: "flex", width: "fit-content" }}
                      className="p-2 cursor-pointer hover:bg-cyan-500 hover:text-white"
                    >
                      Prescription{" "}
                      <img
                        className="h-5 w-5 object-contain"
                        src="/prescription.png"
                        alt=""
                      />
                    </Tag>
                  )}
                </td>
                <td>
                  <Link href={`/meeting/${dets?.doctor}/${dets?.tele}`}> 
                  <Tag
                    color={"gold"}
                    style={{ display: "flex", width: "fit-content" }}
                    className="p-2 cursor-pointer hover:bg-orange-200 gap-2 hover:text-black"
                  >
                    Video Call{" "}
                    <img
                      className="h-5 w-5 object-contain"
                      src="/video.png"
                      alt=""
                    />
                  </Tag>
                  </Link>
               
                </td>
                <td>
                  <Tag color={"green"}>{dets?.status}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Appointment;
