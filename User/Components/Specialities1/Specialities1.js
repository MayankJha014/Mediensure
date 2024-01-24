import React from 'react'

const Specialities1 = () => {
  return (
    <>
    <div className='h-fit w-full flex flex-col px-36 gap-2  py-24 max-md:pt-20 max-md:px-5    justify-center '>
        <h1 className='text-2xl  max-md:text-xl font-medium'>Search Health Problems</h1>
    <div className="w-full max-md:w-full  flex  h-fit gap-5  max-md:flex-col-reverse"style={{backgroundColor:"#ececec"}}>
        <div className='h-fit w-fit border-2 flex items-center  px-4'>
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Search Symptoms/Speacialities" className="outline-none     px-2   text-sm w-[40vw] max-md:w-[80vw]   rounded py-3"style={{backgroundColor:"#ececec"}} />
 
        </div>



                 
                </div>
    </div>
    </>
  )
}

export default Specialities1