"use client";
import { uploadDentalBanner } from '@/store/Action/Authentication';
import { Button } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Banner = ({setbanner}) => {
    const [img, setImg] = useState(null);
    const {loading} = useSelector((state)=>state.adminReducer);
  
  const {imgLink,homepage,load} = useSelector((state)=>state.others)
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImg(imageUrl);
      }
    };
    const dispatch = useDispatch()
  const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(e.target.image.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.image.files[0]);
      dispatch(uploadDentalBanner(formData));
      setImg("");
      setbanner(false);
  }
  return (
<>
<div className="flex flex-col items-start justify-start p-10">
<i className="ri-arrow-left-line text-2xl cursor-pointer" onClick={()=>setbanner(false)}></i>
<div className="form-control w-full max-w-xs">
          <form onSubmit={(e)=>handleSubmit(e)}>
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
            {
                img &&       <>
                 <Button variant="contained" onClick={()=>setImg("")} className="bg-red-500 hover:bg-red-600">Delete Image</Button>
                <Button variant="contained" type="submit" className="bg-blue-500">Submit Image</Button>
                </>
            }
     
           </div>
            </div>
          </form>
          </div>
</div>

</>
  )
}

export default Banner