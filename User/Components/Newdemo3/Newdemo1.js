import { Skeleton } from '@mui/material'
import React from 'react'

const Newdemo1 = ({data,imgLink}) => {
  return (
    <>
   <div className='h-[70vh] w-full   gap-5   flex flex-col  items-center  pt-[10vh] '>
     
        {/* <div className='h-[70vh]  w-full flex flex-col gap-4 justify-center max-md:h-[50vh]  bg-cover' style={{backgroundImage:"url(/dentalB.png)"}}> */}
        
         
        {/* </div> */}
        {
          data?.filename && data?.mimetype ? 
        <img    
        src={`${imgLink}/${data?.filename}/${data?.mimetype}`} 
        className='w-full h-full object-cover max-md:h-fit' alt="" 
        />
          : <Skeleton variant="rectangular" width={"100%"} height={"100%"} />

        }

   
    </div>
    </>
  )
}

export default Newdemo1