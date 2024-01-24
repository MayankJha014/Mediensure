"use client"
import Nav from '@/Components/Nav/Nav'
import Sidebar from '@/Components/Sidebar/Sidebar'
import { Button } from '@mui/material'
import React, { useState } from 'react'

const page = () => {
  const [img, setImg] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImg(imageUrl);
        }
      };
  return (
<>
<Nav/>
    <div className="flex" style={{height:"calc(100vh - 10vh)"}}>
        <Sidebar/>
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
<div className="w-full h-[50vh] bg-red-500">
    <img src="" alt="" />
    </div>
    </div>
</>
    
  )
}

export default page