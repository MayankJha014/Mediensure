"use client"
import Checkup1 from '@/Components/Checkup1/Checkup1'
import Checkup2 from '@/Components/Checkup2/Checkup2'
import Checkup3 from '@/Components/Checkup3/Checkup3'
import Checkup4 from '@/Components/Checkup4/Checkup4'
import Footer from '@/Components/Footer/Footer'
import Nav from '@/Components/Nav/Nav'
import Newdemo2 from '@/Components/Newdemo2/Newdemo2'
import Newdemo33 from '@/Components/Newdemo33/Newdemo33'
import ResFooter from '@/Components/ResFooter/ResFooter'
import { getEyeCare, getHomePage } from '@/store/Action/others'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
const {eyeCare,imgLink} = useSelector((state)=>state.others);
const dispatch = useDispatch()
useEffect(() => {
dispatch(getEyeCare())
}, [])

  return (
    <>
    <Nav/>
    <div className="w-full relative overflow-hidden">
    <Checkup1 data={eyeCare?.banner} imgLink={imgLink}/>
    <Newdemo2 data={eyeCare?.plans}/>
    <Newdemo33 data={eyeCare?.inclusion} imgLink={imgLink}/>

    <Checkup4/>
    <ResFooter/>
    </div>
   <Footer/>
    </>
  )
}

export default page
