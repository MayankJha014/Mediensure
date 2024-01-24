"use client";
import { Input } from "antd";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  uploadDentalBanner,
  uploadDentalInclusions,
  uploadEyeInclusions,
} from "@/store/Action/Authentication";
import { CloseRounded } from "@mui/icons-material";
const EyeInclusion = ({ setopen }) => {
  const [price, setprice] = useState("");
  const [img, setImg] = useState(null);

  const [text, settext] = useState("");
  const [inclusion, setinclusion] = useState([]);
  console.log(inclusion, 741);
  const add = () => {
    if (text.trim().length > 0) setinclusion([...inclusion, text]);

    settext("");
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
    console.log(e.target.image.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("price", price);
    formData.append("inclusions", JSON.stringify(inclusion));
    console.log(formData);
    dispatch(uploadEyeInclusions(formData));
    setImg("");
    setprice("");
    setinclusion("");
    settext("");
  };
  const removeInclusions = (index) => {
    const filter = inclusion?.filter((i, id) => id !== index);
    setinclusion(filter);
  };
  return (
    <>
      <div className="w-full flex flex-col items-start bg-gray-100 p-14 gap-[3vw] relative overflow-y-auto ">
        <i
          className="ri-arrow-left-line text-2xl cursor-pointer"
          onClick={() => setopen(false)}
        ></i>
        <form
          className="w-full flex flex-col gap-[1vw]"
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
          <div className="flex flex-col gap-3 ">
            <h3>Plan Price</h3>
            <Input
              size="large"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder="Plan Price"
              type="number"
              className="w-1/2"
            />
          </div>

          <div className="flex flex-col gap-3 w-1/2 ">
            <h3>Inclusions</h3>
            <div className="flex items-center justify-center bg-white p-2 w-full border-2">
              <input
                type="text"
                value={text}
                onChange={(e) => settext(e.target.value)}
                className="outline-none bg-transparent p-1 w-full"
                placeholder="Add Inclusions here..."
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
            {inclusion && inclusion?.length > 0 ? (
              <div className="flex flex-col bg-white p-2">
                {inclusion?.map((dets, index) => (
                  <div
                    className="h-fit w-full flex items-center justify-center p-1 bg-white"
                    key={index}
                  >
                    <img className="h-4" src="/tick.png" alt="" />
                    <h1 className="text-base">{dets}</h1>
                    <i
                      className="ri-close-circle-fill ml-auto cursor-pointer text-red-500"
                      onClick={() => removeInclusions(index)}
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

export default EyeInclusion;
