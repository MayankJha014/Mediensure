"use client";
import Nav from '@/Components/Nav/Nav'
import { getBlog, getPost } from '@/store/Action/others';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const {id} = useParams();
    const {post,imgLink} = useSelector((state)=>state.others)
    const dispatch = useDispatch();
    useEffect(() => {
   dispatch(getPost(id))
        
    }, [])

  return (
    <>
    <Nav/>
    <div className="w-full min-h-screen relative translate-y-[10vh] p-10">
         <h1 className='text-4xl text-center font-semibold'>{post?.heading}</h1>
         <img className='h-[25vw] w-[25vw] object-contain mx-auto mt-5' src={`${imgLink}/${post?.filename}/${post?.mimetype}`} alt="" />
         <p className='text-lg mt-10'>
            {
                post?.content
            }
         </p>
         <h3 className='text-right mt-10'>
            Published at:- 
            {
                post?.date
            }
         </h3>
    </div>
    </>
  )
}

export default page