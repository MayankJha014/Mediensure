import PrescriptionPage from '@/Components/Doctor/Consult/PrescriptionPage'
import SideDoctor from '@/Components/Doctor/SidebarDoctor/SideDoctor'
import Nav from '@/Components/Nav/Nav'
import NavDoctor from '@/Components/Nav/NavDoctor'
import Sidebar from '@/Components/Sidebar/Sidebar'
import SidebarOperator from '@/Components/Sidebar/SidebarOperator'
import React from 'react'

const page = () => {
  return (
   <>
   <NavDoctor/>
   <div className="w-full flex relative overflow-hidden" style={{height:"calc(100vh - 10vh)"}}>
    <SidebarOperator/>
  <PrescriptionPage/>
   </div>
   </>
  )
}

export default page