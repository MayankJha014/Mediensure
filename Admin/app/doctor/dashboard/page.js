import SideDoctor from '@/Components/Doctor/SidebarDoctor/SideDoctor'
import Nav from '@/Components/Nav/Nav'
import NavDoctor from '@/Components/Nav/NavDoctor'
import Sidebar from '@/Components/Sidebar/Sidebar'
import React from 'react'

const page = () => {
  
  return (
    <>
    <NavDoctor/>
    <div className="w-full flex" style={{height:"calc(100vh - 10vh)"}}>
    <SideDoctor/>
    <div className="w-full h-full flex">
     <div className="h-full w-[30%]">
      <img src="" alt="" />
     </div>
     <div className="h-full w-[70%] flex flex-col">

     </div>
    </div>
    </div>
    </>
  )
}

export default page