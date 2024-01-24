import DoctorDets from '@/Components/Admin/Doctor/DoctorDets'
import Nav from '@/Components/Nav/Nav'
import NavOperation from '@/Components/Nav/NavOperation'
import Sidebar from '@/Components/Sidebar/Sidebar'
import SidebarOperator from '@/Components/Sidebar/SidebarOperator'
import React from 'react'

const page = () => {
  return (
    <>
    <NavOperation/>
    <div className="flex w-full" style={{height:"calc(100vh - 10vh)"}}>
        <SidebarOperator/>
        <DoctorDets/>
    </div>
    </>
  )
}

export default page