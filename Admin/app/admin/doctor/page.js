import DoctorDets from '@/Components/Admin/Doctor/DoctorDets'
import Nav from '@/Components/Nav/Nav'
import Sidebar from '@/Components/Sidebar/Sidebar'
import React from 'react'

const page = () => {
  return (
    <>
    <Nav/>
    <div className="flex w-full" style={{height:"calc(100vh - 10vh)"}}>
        <Sidebar/>
        <DoctorDets/>
    </div>
    </>
  )
}

export default page