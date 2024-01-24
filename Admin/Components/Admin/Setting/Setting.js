"use client";
import { getadmin, updateConsultFees } from "@/store/Action/Authentication";
import { Button } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Setting = () => {
  const { admin } = useSelector((state) => state.adminReducer);

  const [consult, setconsult] = useState("");
  console.log(admin, 45);
  const dispatch = useDispatch();
  const submitConsult = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("consultationFees", e.target.consultationFees.value);
      dispatch(updateConsultFees(formData))
  };
  return (
    <>
      <div className="w-full p-10">
        <div className="flex flex-col w-fit items-start gap-2">
          <h1>Consultation Percentage</h1>
          <form
            onSubmit={submitConsult}
            className="flex flex-col w-fit items-start gap-2"
          >
            <input
              defaultValue={admin?.consultationFees}
              name="consultationFees"
              className="w-40 border-2 p-2 py-1"
              type="number"
            />
            <Button htmlType="submit">Update</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
