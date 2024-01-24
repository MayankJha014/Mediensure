"use client";
import Footer from '@/Components/Footer/Footer'
import Nav from '@/Components/Nav/Nav'
import Newdemo4 from '@/Components/NewDemo4/Newdemo4'
import Newdemo2 from '@/Components/Newdemo2/Newdemo2'
import Newdemo1 from '@/Components/Newdemo3/Newdemo1'
import Newdemo33 from '@/Components/Newdemo33/Newdemo33'
import ResFooter from '@/Components/ResFooter/ResFooter'
import { getDental, getHomePage } from '@/store/Action/others';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
  const {dental,imgLink} = useSelector((state)=>state.others)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDental())
  }, []);
  console.log(dental,746);
  return (
    <>
    <Nav/>
  <div className="w-full relative overflow-hidden">
  <Newdemo1 data={dental?.banner} imgLink={imgLink} />
    <Newdemo2 data={dental?.plans}/>
    <Newdemo33 data={dental?.inclusion} imgLink={imgLink}/>
    <Newdemo4/>
    <ResFooter/>
  </div>
    <Footer/>
    </>
  )
}

export default page