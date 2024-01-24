import DocConsult from '@/Components/Doctor/Consult/DocConsult'
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
    <div className="w-full h-full flex relative overflow-y-auto p-10">
     <DocConsult/>
    </div>
    </div>
    </>
  )
}

export default page