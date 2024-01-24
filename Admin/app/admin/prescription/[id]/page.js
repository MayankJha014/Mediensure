import PrescriptionPage from '@/Components/Doctor/Consult/PrescriptionPage'
import SideDoctor from '@/Components/Doctor/SidebarDoctor/SideDoctor'
import Nav from '@/Components/Nav/Nav'
import Sidebar from '@/Components/Sidebar/Sidebar'
import React from 'react'

const page = () => {
  return (
   <>
   <Nav/>
   <div className="w-full flex relative overflow-hidden" style={{height:"calc(100vh - 10vh)"}}>
    <Sidebar/>
  <PrescriptionPage/>
   </div>
   </>
  )
}

export default page