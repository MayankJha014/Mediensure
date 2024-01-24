import React, { useEffect } from 'react'

const Checkup1 = ({data,imgLink}) => {
  useEffect(() => {

  }, [data])
  
  return (
   <>
    {/* <div className='h-fit w-full   gap-5   flex flex-col  items-center py-28 '>
     
     <div className='h-[70vh]  w-full flex flex-col gap-4 justify-center ' style={{backgroundImage:"url(/eyeplan.png)",backgroundSize:"cover"}}>
      
     </div>


 </div> */}
    <div className='h-[60vh] w-full   gap-5   flex flex-col  items-center mt-[10vh]'>
     
     {/* <div className='h-[70vh]  w-full flex flex-col gap-4 justify-center max-md:h-[50vh]  bg-cover' style={{backgroundImage:"url(/dentalB.png)"}}> */}
     
      
     {/* </div> */}
     <img src={`${imgLink}/${data?.filename}/${data?.mimetype}`} className='w-full h-full object-cover max-md:h-fit' alt="" />


 </div>
   </>
  )
}

export default Checkup1