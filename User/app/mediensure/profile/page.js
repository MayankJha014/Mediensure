"use client";
import Nav from '@/Components/Nav/Nav';
import ConsultationHistory from '@/Components/Setting/ConsultationHistory';
import OfflineConsult from '@/Components/Setting/OfflineConsult';
import Profile from '@/Components/Setting/Profile';
import Sidebar from '@/Components/Setting/Sidebar'
import { checkUser, getAllConsultation, getAllOfflineConsultation } from '@/store/Action/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const page = () => {
  const [open, setopen] = useState(0);
const {user,message,loading,consult,ofconsult} = useSelector((state)=>state.auth);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(checkUser());
dispatch(getAllConsultation())
dispatch(getAllOfflineConsultation())
  if (message) {
    toast.success(message);
    dispatch(clearSuccessMsg());
  }
}, [message, loading]);
  return (
    <>
    <Nav/>
    <div className="w-full flex  relative overflow-hidden translate-y-[10vh]" style={{height:"calc(100vh - 10vh)"}}>
        <Sidebar setopen={setopen} />
        {
          open === 0 ? 
          <Profile user={user}/>
          :
          open === 1 ?
          <ConsultationHistory data={consult}/> 
          :
          open === 4 ?
          <OfflineConsult data={ofconsult}/> : ""
        }
    </div>
    </>
  )
}

export default page