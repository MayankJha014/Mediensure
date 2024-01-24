"use client";
import { Select, Space } from "antd";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  uploadDentalDoctor,
  uploadDentalInclusions,
  uploadDoctor,
} from "@/store/Action/Authentication";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const AddDentalConsult = ({ doctor }) => {
  const [img, setImg] = useState(null);
  const [language, setlanguage] = useState([]);
  const [type, settype] = useState([]);
  const handleChange = (value) => {
    setlanguage(value);
  };
  const handleChangeType = (value) => {
    settype(value);
  };
  console.log(language, 196);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
    }
  };
  useEffect(() => {}, [doctor]);
  const { Option } = Select;

  console.log(language, 423);
  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  console.log(doctor, 789);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = e.target;
    // console.log(v);
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("firstname", v.firstname.value);
    formData.append("lastname", v.lastname.value);
    formData.append("fees", v.fees.value);
    formData.append("pincode", v.pincode.value);
    formData.append("type", JSON.stringify(type));
    
    formData.append("experience", v.experience.value);
    formData.append("language", JSON.stringify(language));
    // console.log(formData);
    // const info = {
    //   ...formData,
    //  language:language
    // }
    dispatch(uploadDoctor(formData));
    setImg("");
    // setOpen(false);
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
  const Typedata = [
    {
      value: "General Dentist",
      label: "General Dentist",
    },
    {
      value: "Prosthodontist and Implantologist",
      label: "Prosthodontist and Implantologist",
    },
    {
      value: "Oral & Maxillifacial Pathologist",
      label: "Oral & Maxillifacial Pathologist",
    },
    {
      value: "Implantologist",
      label: "Implantologist",
    },
    {
      value: "Prosthodontist",
      label: "Prosthodontist",
    },
    {
      value: "Pediatric Dentist",
      label: "Pediatric Dentist",
    },
    {
      value: "Dental surgery",
      label: "Dental surgery",
    },
    {
      value: "Orthodontist",
      label: "Orthodontist",
    },
    {
      value: "BDS , cosmetic dental SURGEON",
      label: "BDS , cosmetic dental SURGEON",
    },
  ];
  useEffect(() => {
   settype(doctor?.type);
   setlanguage(doctor?.language)
  }, [doctor])
  
  return (
    <>
      <div className="flex flex-col p-10">
        <i
          className="ri-arrow-left-line text-2xl cursor-pointer"
          // onClick={() => setOpen(false)}
        ></i>
        <form
          className="w-full flex flex-col gap-[1vw] "
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="label">
            <span className="label-text">Select Your Image</span>
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
                  {/* <Button
                    variant="contained"
                    type="submit"
                    className="bg-blue-500"
                  >
                    Submit Image
                  </Button> */}
                </>
              )}
            </div>
          </div>

          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            // value={language}
            onChange={handleChange}
            value={language}
          >
            {data?.map((dets, index) => (
              <Option key={index} value={dets?.value}>
                {dets.value}
              </Option>
            ))}
          </Select>
          <div className="flex flex-col gap-3 ">
            <h3>Doctor First Name</h3>
            <input
              size="large"
              type="text"
              name="firstname"
              className="w-1/2 px-2 py-1 hover:shadow-sm hover:shadow-blue-300 duration-300 ease-linear outline-blue-600"
              defaultValue={doctor?.firstname}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3>Doctor Last Name</h3>
            <input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              // placeholder="Doctor's Lasr Name"

              type="text"
              name="lastname"
              className="w-1/2 px-2 py-1 hover:shadow-sm hover:shadow-blue-300 duration-300 ease-linear outline-blue-600"
              defaultValue={doctor?.lastname}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3>Doctor Type</h3>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              // value={language}
              onChange={handleChangeType}
              value={type}
            >
              {Typedata?.map((dets, index) => (
                <Option key={index} value={dets?.value}>
                  {dets.value}
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3 ">
            <h3>Experience</h3>
            <input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              // value={doctor?.experience || ''}

              placeholder="Experience"
              type="number"
              name="experience"
              className="w-1/2 px-2 py-1 hover:shadow-sm hover:shadow-blue-300 duration-300 ease-linear outline-blue-600"
              defaultValue={doctor?.experience}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3>Your PinCode</h3>
            <input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Pin Code"
              type="number"
              name="pincode"
              className="w-1/2 px-2 py-1 hover:shadow-sm hover:shadow-blue-300 duration-300 ease-linear outline-blue-600"
              defaultValue={doctor?.pincode}

              // value={doctor?.fees || ''}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <h3>Consultation Charges</h3>
            <input
              size="large"
              //   value={price}
              //   onChange={(e) => setprice(e.target.value)}
              placeholder="Consultation Fees"
              type="number"
              name="fees"
              className="w-1/2 px-2 py-1 hover:shadow-sm hover:shadow-blue-300 duration-300 ease-linear outline-blue-600"
              defaultValue={doctor?.fees}

              // value={doctor?.fees || ''}
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

export default AddDentalConsult;
