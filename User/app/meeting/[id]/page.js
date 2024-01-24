"use client";
import MyVideo from '@/Components/MyVideo/MyVideo';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
    const {id} = useParams()
  return (
   <>

   <MyVideo id={id}/>

   </>
  )
}

export default page