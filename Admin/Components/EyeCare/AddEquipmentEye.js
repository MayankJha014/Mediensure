"use client";
import { Input, Select, Space } from "antd";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  uploadDentalDoctor,
  uploadDentalEqupment,
  uploadDentalInclusions,
  uploadEyeEqupment,
} from "@/store/Action/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { Remove } from "@mui/icons-material";
const AddEquipmentEye = ({ setOpen }) => {
  const [img, setImg] = useState([]);
  const [text, settext] = useState("");
  const [dets, setdets] = useState("");
  const [details, setdetails] = useState([]);
  const [description, setdescription] = useState([]);
  const [language, setlanguage] = useState([]);
  const handleChange = (value) => {
    setlanguage([...language, value]);
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (const file of files) {
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    }

    setImg([...img, ...newImages]);
  };
  const removeImage = (ind) => {
    const data = img?.filter((i, index) => index !== ind);
    setImg(data);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = e.target;
    // console.log(v);
    const formData = new FormData();
    for (let i = 0; i < v.images.files.length; i++) {
      formData.append(`images`, v.images.files[i]);
    }

    formData.append("name", v.name.value);
    formData.append("colour", v.colour.value);
    formData.append("subname", v.subname.value);
    formData.append("description", JSON.stringify(description));
    formData.append("details", JSON.stringify(details));
    // console.log(formData);
    dispatch(uploadEyeEqupment(formData));
    setImg("");
    setOpen(false);
    setdescription("");
    setdetails("");
  };
  const add = () => {
    if (text.trim().length > 0) setdescription([...description, text]);

    settext("");
  };
  const addDets = () => {
    if (dets.trim().length > 0) setdetails([...details, dets]);

    setdets("");
  };
  const removeDescription = (index) => {
    const filter = description?.filter((i, id) => id !== index);
    setdescription(filter);
  };
  const removeDetails = (index) => {
    const filter = details?.filter((i, id) => id !== index);
    setdetails(filter);
  };
  return (
    <>
      <div className="flex flex-col p-10">
        <i
          className="ri-arrow-left-line text-2xl cursor-pointer"
          onClick={() => setOpen(false)}
        ></i>
        <form
          className="w-full flex flex-col gap-[1vw] "
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="label">
            <span className="label-text">Select Banner Image</span>
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs"
            name="images"
            multiple // Allow multiple file selection
          />
          <div className="flex gap-4 p-4 items-center justify-start">
            {img && img?.length > 0
              ? img?.map((i, ind) => (
                  <div className="flex flex-col">
                    <img
                      key={ind}
                      src={i}
                      className="h-[5vw] w-[5vw] object-contain"
                      alt="Selected Image"
                    />
                    <button
                      onClick={() => removeImage(ind)}
                      className="bg-red-500 text-center w-full text-white text-sm"
                    >
                      REMOVE
                    </button>
                  </div>
                ))
              : ""}
          </div>
          {/* <Select
            defaultValue="Hindi"
            style={{
              width: "50%",
            }}
            onChange={handleChange}
            options={data}
          /> */}
          <div className="flex flex-col gap-3 ">
            <h3>Equipment Name</h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Equipment Name"
              type="text"
              name="name"
              className="w-1/2"
            />
          </div>

          <div className="flex flex-col gap-3 ">
            <h3>Equipment Colour</h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Doctor Type"
              type="text"
              name="colour"
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3>Equipment Small description</h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Expirenece"
              type="text"
              name="subname"
              className="w-1/2"
            />
          </div>
          {/* <div className="flex flex-col gap-3 ">
            <h3>Equpment </h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Doctor Charges"
              type="number"
              className="w-1/2"
              name="charges"
            />
          </div> */}

          <div className="flex flex-col gap-3 w-1/2 ">
            <h3>Description</h3>
            <div className="flex items-center justify-center bg-white p-2 w-full border-2">
              <input
                type="text"
                value={text}
                onChange={(e) => settext(e.target.value)}
                className="outline-none bg-transparent p-1 w-full"
                placeholder="Add Description here..."
              />
              {text && text.trim().length > 0 ? (
                <i
                  onClick={add}
                  className="ri-add-circle-fill text-xl cursor-pointer"
                ></i>
              ) : (
                ""
              )}
            </div>
            {description && description?.length > 0 ? (
              <div className="flex flex-col bg-white p-2">
                {description?.map((dets, index) => (
                  <div
                    className="h-fit w-full flex items-center justify-center p-1 bg-white"
                    key={index}
                  >
                    <Remove className="h-2 w-2" />
                    <h1 className="text-base">{dets}</h1>
                    <i
                      className="ri-close-circle-fill ml-auto cursor-pointer text-red-500"
                      onClick={() => removeDescription(index)}
                    ></i>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-3 w-1/2 ">
            <h3>Details</h3>
            <div className="flex items-center justify-center bg-white p-2 w-full border-2">
              <input
                type="text"
                value={dets}
                onChange={(e) => setdets(e.target.value)}
                className="outline-none bg-transparent p-1 w-full"
                placeholder="Add Details here..."
              />
              {dets && dets.trim().length > 0 ? (
                <i
                  onClick={addDets}
                  className="ri-add-circle-fill text-xl cursor-pointer"
                ></i>
              ) : (
                ""
              )}
            </div>
            {details && details?.length > 0 ? (
              <div className="flex flex-col bg-white p-2">
                {details?.map((dets, index) => (
                  <div
                    className="h-fit w-full flex items-center justify-center p-1 bg-white"
                    key={index}
                  >
                    <Remove className="h-2 w-2" />
                    <h1 className="text-base">{dets}</h1>
                    <i
                      className="ri-close-circle-fill ml-auto cursor-pointer text-red-500"
                      onClick={() => removeDetails(index)}
                    ></i>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            className="bg-blue-500 w-fit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddEquipmentEye;
