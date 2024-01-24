import React from 'react'

const Consult3 = () => {
  return (
    <>
    <div className='h-fit w-full px-32  flex flex-col  '>
        <h1 className='h-32 pt-24   text-xl font-semibold'>Offers</h1>
        <div className='h-fit mb-32   flex gap-10   w-full'>
            <div className='h-48 w-full flex flex-col gap-2  rounded-2xl pl-5 pt-3 text-blue-300' style={{backgroundColor:"#d9dbff"}}>
                <h1 className='bg-white w-fit px-1  text-xs font-bold '>OFFERS</h1>
                <div className='h-32 w-full text-black flex items-center'>
                    <div className='h-fit w-full  flex flex-col gap-7'>
                        <h1 className='text-base font-bold'>Download the App & get
  200 HealthCash</h1>
  <h2 className='text-sm'>Download App</h2>
                    </div>
                    <div className='h-fit w-full  flex items-center justify-center'>
                        <img src="/cb.png" alt="" />
                    </div>

                </div>
               
                

            </div>
            <div className='h-48 w-full  rounded-2xl pl-5 pt-3' style={{backgroundColor:"#fddbf6"}}>
            <h1 className='bg-white w-fit px-1  text-xs font-bold  text-pink-400'>Mediensure Plus</h1>
            <div className='h-32 w-full text-black flex items-center'>
                    <div className='h-fit w-full  flex flex-col gap-7'>
                        <h1 className='text-base font-bold'>Free Online Consultations
starting at    799/month</h1>
  <h2 className='text-sm'>Get Memberships</h2>
                    </div>
                    <div className='h-fit w-full  flex items-center justify-center'>
                        <img src="/cb.png" alt="" />
                    </div>

                </div>
               
            </div>

        </div>
    </div>
    </>
  )
}

export default Consult3