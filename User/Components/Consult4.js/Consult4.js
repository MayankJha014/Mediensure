import React from 'react'

const Consult4 = () => {
  return (
  <>
  <div className='h-fit w-full flex items-center px-32 py-14 justify-center'>
    <div className='h-80 w-full bg-white flex gap-5  pl-10  ' style={{border:"5px solid #a9bb96"}}>
        <div className='h-60 w-40 flex items-start pt-2 ml-8 justify-center '>
            <div className='h-fit w-36  flex rounded-b-xl border-transparent  ' style={{backgroundColor:"#77905a"}}>
                <img className='h-[70%]' src="/drc.png" alt="" />
            </div>
        </div>
        <div className='h-60 w-[80%]  flex-col  pt-16  gap-2 flex '>
            <h1 className='text-2xl font-bold'style={{color:"#77905a"}}>Say Hello!</h1>
            <h2 className='text-xl'style={{color:"#77905a"}}>To a new era of healthcare</h2>
        <p className='text-base'style={{color:"#77905a"}}>Now consult a specialist doctor online from top hospitals, <br />
within 10 minutes anytime, anywhere.</p>

        </div>
        <div className='h-fit object-cover w-fit pt-12  shrink-0  flex '>
            <img className='h-64  w-fit' src="/manc.png" alt="" />
        </div>

         </div>
  </div>
  </>
  )
}

export default Consult4