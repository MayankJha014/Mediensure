"use client";
import MyVideo from '@/Components/VideoSdk'
import { doctorConnected, getDoctor } from '@/store/Action/Authentication';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const page = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
  dispatch(doctorConnected(id))
    }, [])
    
  return (
   <>
   
   <MyVideo id={id}/>
   </>
  )
}

export default page