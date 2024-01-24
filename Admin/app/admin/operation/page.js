"use client";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import {
  getInstitute,
  getOperator,
  getOperatorDets,
  updateOperatorStatus,
} from "@/store/Action/Authentication";
import { clearError, clearmessage } from "@/store/Reducer/AdminReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const dispatch = useDispatch();
  const { operator, loading ,message,error} = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(getOperatorDets());
  }, []);
const handleCheckboxChange = (id)=>{
    dispatch(updateOperatorStatus(id))
}
useEffect(() => {
if(message){
    dispatch(getOperatorDets());

}
if(error){
    toast.error(error);
    dispatch(clearError())
}
}, [message,error,loading])

  return (
    <>
      <Nav />
      <div
        className="w-full bg-white relative overflow-hidden flex"
        style={{ height: "calc(100vh - 10vh)" }}
      >
        <Sidebar />
        <div className="w-full h-full flex flex-col gap-10 p-10 relative overflow-y-auto">
          <h1 className="text-2xl">Operator's Details</h1>
          <div className="overflow-x- w-full">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>S. No.</th>

                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Verified</th>
                  {/* <th>Doctor Name</th>
                    <th>Pin Code</th> */}
                </tr>
              </thead>
              <tbody>
                {operator?.map((dets, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>
                      {dets?.firstname} {dets?.lastname}
                    </th>
                    <td>{dets?.number}</td>
                    <td>{dets?.email}</td>
                    <th>
                      <label>

                        <input
                          type="checkbox"
                          className="toggle"
                          onClick={() => handleCheckboxChange(dets?._id)}
                          checked={dets?.verfiy}
                        />
                      </label>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
