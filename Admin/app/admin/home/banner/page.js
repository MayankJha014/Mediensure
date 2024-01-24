"use client";
import Nav from "@/Components/Nav/Nav";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { checkAdmin, getImage, uploadImage } from "@/store/Action/Authentication";
import { getHomePage } from "@/store/Action/others";
import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [img, setImg] = useState(null);
  const {loading,isAuthenticated} = useSelector((state)=>state.adminReducer);

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
    dispatch(uploadImage(formData));
    setImg("")
}

useEffect(() => {
  dispatch(getHomePage());
  dispatch(checkAdmin())
}, [loading,isAuthenticated]);


  return (
    <>
    <Nav/>
      <div className="w-full flex" style={{height:"calc(100vh - 10vh)"}}>
        <Sidebar />
        <div className="w-full relative p-10 flex flex-col items-center justify-center ">
          {
             loading || load?   
             <div className="w-full relative h-full flex items-center justify-center">
    <Box sx={{ display: 'flex' }}>
             <CircularProgress />
           </Box>
             </div> : 
             <>
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
          {
            homepage && homepage?.banner ? 
      <img className="h-[50vh]  object-contain"
            src={`${imgLink}/${homepage?.banner?.filename}/${homepage?.banner?.mimetype}`}
            alt=""
          /> : ""
          }
             </>
          }
       
      
        </div>
     
      </div>
    </>
  );
};

export default Page;
