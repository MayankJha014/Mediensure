"use client";
import DoctorDets from '@/Components/Admin/Doctor/DoctorDets'
import NetworkConsult from '@/Components/Admin/Doctor/NetworkConsult'
import Loader from '@/Components/Loader';
import Nav from '@/Components/Nav/Nav'
import NavOperation from '@/Components/Nav/NavOperation'
import Sidebar from '@/Components/Sidebar/Sidebar'
import SidebarOperator from '@/Components/Sidebar/SidebarOperator'
import { getNetworkConsult, getNetworkConsultOperator, updateNetworkConsult, updateNetworkConsultOperator } from '@/store/Action/Authentication';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
  const { nconsult,loading,message } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNetworkConsult());
  }, []);
  const [id, setid] = useState(
    ""
  )
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const updateStatus = (id,e)=>{
    if(e === "Resechdudled"){
      setid(id)
      return showModal()
    }
    const info = {
        status:e
    }

    dispatch(updateNetworkConsult(id,info));
    
  }
  const handlesechdule = (date,time)=>{
    const info = {
      status:"Resechdudled",
      date:date,
      time:time
    }
    dispatch(updateNetworkConsult(id,info))
    handleCancel()

  }
  useEffect(() => {
   if(message){
    dispatch(getNetworkConsult())
   }
  }, [loading,nconsult,message])
  
  return (
    <>
    <NavOperation/>
    <div className="flex w-full" style={{height:"calc(100vh - 10vh)"}}>
        <SidebarOperator/>
        {
          loading ? <Loader/> : 
          <div className="w-full flex flex-col items-start p-10 gap-5">
          <NetworkConsult nconsult={nconsult} updateStatus={updateStatus} handlesechdule={handlesechdule} isModalOpen={isModalOpen} handleCancel={handleCancel}/>
  
          </div>
        }
 
    </div>
    </>
  )
}

export default page;