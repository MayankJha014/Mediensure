"use client";
import { Input, Select, Space } from "antd";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  uploadDentalDoctor,
  uploadDentalInclusions,
  uploadEyeDoctor,
} from "@/store/Action/Authentication";
import { useDispatch } from "react-redux";
const AddEyeConsult = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [language, setlanguage] = useState([]);
  const handleChange = (value) => {
    setlanguage([...language, value]);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
    }
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = e.target;
    // console.log(v);
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("name", v.name.value);
    formData.append("price", v.charges.value);
    formData.append("type", v.type.value);
    formData.append("expierence", v.expierence.value);
    formData.append("language", JSON.stringify(language));
    // console.log(formData);
    dispatch(uploadEyeDoctor(formData));
    setImg("");
    setOpen(false);
    // setprice("");
    // setinclusion("");
    // settext("");
  };
  const data = [
    {
      value: "English",
      label: "English",
    },
    {
      value: "Hindi",
      label: "Hindi",
    },
    {
      value: "Marathi",
      label: "Marathi",
    },
    {
      value: "Telugu",
      label: "Telugu",
    },
  ];

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
            name="image"
          />
          <div className="flex flex-col gap-4 p-4 items-center justify-center">
            {img && <img src={img} alt="Selected Image" />}
            <div className="flex gap-2">
              {img && (
                <>
                  <Button
                    variant="contained"
                    onClick={() => setImg("")}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete Image
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    className="bg-blue-500"
                  >
                    Submit Image
                  </Button>
                </>
              )}
            </div>
          </div>
          <Select
            defaultValue="Hindi"
            style={{
              width: "50%",
            }}
            onChange={handleChange}
            options={data}
          />
          <div className="flex flex-col gap-3 ">
            <h3>Doctor Name</h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Plan Price"
              type="text"
              name="name"
              className="w-1/2"
            />
          </div>

          <div className="flex flex-col gap-3 ">
            <h3>Doctor Type</h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Doctor Type"
              type="text"
              name="type"
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3>Expirenece</h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Expirenece"
              type="number"
              name="expierence"
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3>Doctor Chareges</h3>
            <Input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Doctor Charges"
              type="number"
              className="w-1/2"
              name="charges"
            />
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

export default AddEyeConsult;
