"use client";
import {
  uploadDentalBanner,
  uploadIvfBanner,
  uploadIvfReview,
} from "@/store/Action/Authentication";
import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const IVFAddReview = ({ setopen }) => {
  const [img, setImg] = useState(null);
  const { loading } = useSelector((state) => state.adminReducer);

  const { imgLink, homepage, load } = useSelector((state) => state.others);
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
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("description",e.target.description.value);
    formData.append("name",e.target.name.value);
    dispatch(uploadIvfReview(formData));
    setImg("");
    setopen(false);
  };
  return (
    <>
      <div className="flex flex-col items-start justify-start p-10">
        <i
          className="ri-arrow-left-line text-2xl cursor-pointer"
          onClick={() => setopen(false)}
        ></i>
        <div className="form-control w-full">
          <form onSubmit={(e) => handleSubmit(e)} className="w-full">
            <label className="label">
              <span className="label-text">Select Banner Image</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs"
              name="image"
            />
            <div className="flex flex-col gap-4 p-4 items-center justify-center w-full">
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
                   
                  </>
                )}
              </div>
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Review Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 w-[80%]"
                placeholder="Write Description here..."
                name="description"
              ></textarea>
            </label>
            <label className="form-control w-full max-w-xs mt-4">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                name="name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <Button
                      variant="contained"
                      type="submit"
                      className="bg-blue-500 mt-4"
                    >
                      Submit Image
                    </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default IVFAddReview;
