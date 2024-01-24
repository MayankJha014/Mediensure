
'use client'
import Equipment1 from '@/Components/Equipment1/Equipment1'
import Equipment2 from '@/Components/Equipment2/Equipment2'
import Equipment3 from '@/Components/Equipment3/Equipment3'
import Equipment4 from '@/Components/Equipment4/Equipment4'
import Equipment5 from '@/Components/Equipment5.js/Equipment5'
import Footer from '@/Components/Footer/Footer'
import Nav from '@/Components/Nav/Nav'
import ResFooter from '@/Components/ResFooter/ResFooter'
import { getDental, getDentalEquipments } from '@/store/Action/others'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
  const {dentalEquipment,dental,imgLink} = useSelector((state)=>state.others);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDental());
    dispatch(getDentalEquipments())
  }, [])
  
  return (
   <>
   <Nav/>
   <Equipment1 imgLink={imgLink} banner={dental?.equipmentBanner}/>
   <Equipment2/>
   <Equipment3/>
   <Equipment4 data={dentalEquipment} imgLink={imgLink}/>
   <Equipment5 data={dental?.equipmentReviews}/>
   <ResFooter/>
   <Footer/>
   </>
  )
}

export default page