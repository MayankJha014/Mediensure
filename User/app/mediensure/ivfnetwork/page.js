"use client"
import Consulting1 from '@/Components/Consulting1/Consulting1'
import Consulting2 from '@/Components/Consulting2/Consulting2'
import Consulting3 from '@/Components/Consulting3/Consulting3'
import Cosnulting4 from '@/Components/Consulting4/Cosnulting4'
import Consulting5 from '@/Components/Consulting5/Consulting5'
import Footer from '@/Components/Footer/Footer'
import Nav from '@/Components/Nav/Nav'
import ResFooter from '@/Components/ResFooter/ResFooter'
import { getHomePage } from '@/store/Action/others'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
const dispatch = useDispatch();
const {homepage,imgLink} = useSelector((state)=>state.others);
useEffect(() => {
dispatch(getHomePage())
}, [])

  return (
    <>
    <Nav/>
    <div className="w-full translate-y-[10vh]">
    <Consulting1 data={homepage?.ivfBanner} imgLink={imgLink}/>
    <Consulting2/>
    <Consulting3/>
    <Cosnulting4 data={homepage?.ivfReview} imgLink={imgLink}/>
    <Consulting5/>
    <ResFooter/>
    <Footer/>
    </div>
 
    
    </>
  )
}

export default page