import Link from "next/link";
import React from "react";

const Equipment4 = ({data,imgLink}) => {
  return (
    <>
      {/* <div className='h-fit w-full flex flex-col py-5  '>
    <h1 className='text-2xl font-medium flex justify-start px-24 py-5 '>Shop</h1>
    <div className='w-full h-fit grid grid-cols-3 grid-rows-2  py-3  gap-10 place-content-center place-items-center  '>
        <div className='h-fit w-56 bg-white       flex flex-col    border-2 '>
         <img className='bg-gray-200' src="/chair.png" alt="" />
            <h1 className='text-base font-medium px-5 py-2 w-full'>
Dental Chair</h1>
<div className='h-fit w-full flex gap-10 '>
<h2 className='px-5 text-xs'>Rs.20,000</h2>
<h3 className='px-5 text-xs 'style={{color:"#6b8350"}}>20% OFF</h3>
</div>


        </div>
   

        <div className='h-fit w-56 bg-white  gap-2     flex flex-col    border-2 '>
         <img className='bg-gray-200' src="/chair.png" alt="" />
            <h1 className='text-base font-medium w-full px-5 py-2'>
Dental Chair</h1>

<div className='h-fit w-full flex gap-10 '>
<h2 className='px-5 text-xs'>Rs.20,000</h2>
<h3 className='px-5 text-xs 'style={{color:"#6b8350"}}>20% OFF</h3>
</div>
        </div>


        <div className='h-fit w-56 bg-white  gap-2     flex flex-col    border-2 '>
         <img className='bg-gray-200' src="/chair.png" alt="" />
            <h1 className='text-base font-medium w-full px-5 py-2 '>
Dental Chair</h1>


<div className='h-fit w-full flex gap-10 '>
<h2 className='px-5 text-xs'>Rs.20,000</h2>
<h3 className='px-5 text-xs 'style={{color:"#6b8350"}}>20% OFF</h3>
</div>
        </div>

        <div className='h-fit w-56 bg-white  gap-2     flex flex-col    border-2 '>
         <img className='bg-gray-200' src="/chair.png" alt="" />
            <h1 className='text-base font-medium w-full px-5 py-2 '>
Dental Chair</h1>


<div className='h-fit w-full flex gap-10 '>
<h2 className='px-5 text-xs'>Rs.20,000</h2>
<h3 className='px-5 text-xs 'style={{color:"#6b8350"}}>20% OFF</h3>
</div>
        </div>

        <div className='h-fit w-56 bg-white  gap-2     flex flex-col    border-2 '>
         <img className='bg-gray-200' src="/chair.png" alt="" />
            <h1 className='text-base font-medium w-full px-5 py-2 '>
Dental Chair</h1>

<div className='h-fit w-full flex gap-10 '>
<h2 className='px-5 text-xs'>Rs.20,000</h2>
<h3 className='px-5 text-xs 'style={{color:"#6b8350"}}>20% OFF</h3>
</div>
        </div>

        <div className='h-fit w-56 bg-white  gap-2     flex flex-col    border-2 '>
         <img className='bg-gray-200' src="/chair.png" alt="" />
            <h1 className='text-base font-medium w-full px-5 py-2'>
Dental Chair</h1>


<div className='h-fit w-full flex gap-10 '>
<h2 className='px-5 text-xs'>Rs.20,000</h2>
<h3 className='px-5 text-xs 'style={{color:"#6b8350"}}>20% OFF</h3>
</div>
        </div>
    </div>
 
   

  
   </div> */}

      <div className="h-fit w-full flex flex-col items-center justify-center py-5  max-md:py-2 max-md:px-4">
        <h1 className="text-2xl font-medium flex justify-start px-24 py-5 max-md:py-0 max-md:px-0  max-md:text-[21px]">
          Shop
        </h1>
        <div className="w-[85%] h-fit flex items-center flex-wrap  py-3  gap-10 max-md:gap-10 ">
          {
            data?.map((dets,index)=>(
              <Link href={`/mediensure/product/${dets?._id}`}>
                     <div key={index} className="h-fit w-56 bg-white cursor-pointer  flex-shrink-0  max-md:w-32  max-md:h-[20vh]     flex flex-col     border-2 ">
              <img className="bg-gray-200" src={ `${imgLink}/${dets?.img[0].filename}/${dets?.img[0].mimetype}`} alt="" />
              <h1 className="text-base  max-md:text-xs max-md:w-fit font-medium px-5 py-2 w-full max-md:py-1 max-md:px-2">
                {dets?.name}
              </h1>
              <div className="h-fit w-full flex gap-16 px-6  max-md:gap-5 max-md:px-3">
                <h2 className=" text-xs  max-md:text-8px]">Rs.20,000</h2>
                <h3
                  className=" text-xs   max-md:text-[6px]"
                  style={{ color: "#6b8350" }}
                >
                  20% OFF
                </h3>
              </div>
            </div>
              </Link>
       
            ))
          }
         
        </div>
      </div>
    </>
  );
};

export default Equipment4;
