"use client"
import Nav from '@/Components/Nav/Nav'
import PrescriptionPage from '@/Components/PrescriptionPage'
import React from 'react'

 
const page = () => {

  return (
   <>
   <Nav/>
   <div className="w-full flex relative overflow-hidden translate-y-[10vh]" style={{height:"calc(100vh - 10vh)"}}>
  <PrescriptionPage/>
   </div>
   </>
  )
}

export default page