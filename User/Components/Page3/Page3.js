import Link from 'next/link'
import React from 'react'

const Page3 = () => {
  return (
    <>
    <div className='h-52 w-full  flex items-center justify-center pl-28 max-md:hidden'>
     <div className='h-32 w-3/4  flex gap-16 items-center justify-start  ' style={{boxShadow:"0px 0px 10px 5px  #d6d6d6"}}>
     <h1 className='text-2xl font-medium pl-10'>Consult with Top Doctors Online ,24/7</h1>
    <Link href={"/mediensure/consult"}>
    <button class="  text-white text-lg font-normal py-4 w-72 px-4 rounded-full" style={{backgroundColor:"#718857"}}>
  Start Consultation
</button>
    </Link>
     </div>
    </div>
    </>
  )
}

export default Page3