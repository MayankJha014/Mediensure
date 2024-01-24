"use client";
import Nav from '@/Components/Nav/Nav'
import { getBlog } from '@/store/Action/others';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const {id} = useParams();
    const {blog} = useSelector((state)=>state.others)
    const dispatch = useDispatch();
    useEffect(() => {
   dispatch(getBlog(id))
        
    }, [])
    
  return (
    <>
    <Nav/>
    <div className="w-full min-h-screen relative translate-y-[10vh] p-10">
         <h1 className='text-4xl text-center font-semibold'>{blog?.heading}</h1>
         <p className='text-lg mt-10'>
            {
                blog?.content
            }
         </p>
         <h3 className='text-right mt-10'>
            Published at:- 
            {
                blog?.date
            }
         </h3>
    </div>
    </>
  )
}

export default page