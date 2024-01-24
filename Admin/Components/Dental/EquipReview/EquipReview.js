"use client";
import { Button } from '@mui/material'
import React, { useState } from 'react'

const EquipReview = ({setreview}) => {
    const [add, setadd] = useState(false)
  return (
    <>
    <div className="w-full p-10 flex flex-col gap-4 ">
    <Button variant='contained' className='w-fit bg-blue-500' onClick={()=>setreview(true)}>
       Add Review 
    </Button>
    <div className="w-full h-96 bg-fuchsia-500">
      
    </div>
    </div>
   
    </>
  )
}

export default EquipReview