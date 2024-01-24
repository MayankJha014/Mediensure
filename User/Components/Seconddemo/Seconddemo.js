import React from 'react'

const Seconddemo = () => {
  return (
    <>
    <div className='h-screen w-full max-md:h-fit max-md:w-full  gap-5 px-4 flex flex-col  items-center py-6 '>
        <h1 className='text-xl font-semibold mt-16 max-md:text-xs '>Use our Healthcare Spectrum and grow your Customer base.</h1>
        <div className='h-screen  max-md:h-[35vh]  w-full flex flex-col gap-4 justify-center ' style={{backgroundImage:"url(/drdemo.png)",backgroundSize:"cover"}}>
          <h1 className='text-xl font-normal w-80 max-md:w-44 ml-24 mt-44 max-md:ml-3 max-md:mt-24 max-md:text-xs  '>For business Owner/partners of 
Virtual Healthcare Co, Insurance 
Co, TPA ,Brokers and healthcare 
delivery partners.</h1>

<button class="bg-blue-500 hover:bg-blue-700 ml-24 max-md:ml-3 text-white text-lg max-md:text-[10px] font-normal w-48 max-md:w-28 py-3 px-4 max-md:px-1 max-md:py-0 rounded">
  BOOK A DEMO
</button>
        </div>

   
    </div>
    </>
  )
}

export default Seconddemo