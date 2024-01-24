import { Button } from '@mui/material'
import React, { useEffect } from 'react'

const IVFNetwork = ({imgLink,data,setopen}) => {
    useEffect(() => {
      
    }, [data])
    
  return (
    <>
    <div className="w-full flex flex-col gap-4">
      <Button variant='contained' onClick={()=>setopen(true)} className='bg-blue-500 w-fit'>Add Banner Image</Button>
      <div className="w-full h-[50vh] bg-gray-200"> 
      <img src={`${imgLink}/${data?.filename}/${data?.mimetype}`} className='w-full h-full object-contain' alt="IVF BANNER IMAGE" />
      </div>
    </div>
    </>
  )
}

export default IVFNetwork