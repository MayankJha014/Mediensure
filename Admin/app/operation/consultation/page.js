"use client";
import Consult from '@/Components/Admin/Consult/Consult'
import Nav from '@/Components/Nav/Nav'
import NavOperation from '@/Components/Nav/NavOperation';
import Sidebar from '@/Components/Sidebar/Sidebar'
import SidebarOperator from '@/Components/Sidebar/SidebarOperator';
import { getAllConsultation, getAllConsultationOp } from '@/store/Action/Authentication';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const {loading,consultation} = useSelector((state)=>state.adminReducer)
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getAllConsultationOp());
    }, [])
    
  return (
    <>
    <NavOperation/>
    <div className="w-full flex" style={{height:"calc(100vh - 10vh)"}}>
       <SidebarOperator/>
       <div className="w-full p-10 h-full relative overflow-y-auto ">
        {
            loading ? 
            <div className="w-full relative h-full flex items-center justify-center">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
            :
          <Consult data={consultation}/>

        }
          
          
       </div>
    </div>
    </>
  )
}

export default page