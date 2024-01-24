"use client"
import { clearDoctorForm } from '@/store/Reducer/AdminReducer'
import { Alert } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const page = () => {
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(clearDoctorForm())
    }, [])
  return (
    <>
    <div className="w-full h-screen bg-[#afc8ad] px-[24vh] py-5">
       <div className="w-full h-[50vh] rounded-xl bg-white relative overflow-hidden text-black p-14">
       <div className="w-full h-6 bg-[#88AB8E] absolute top-0 left-0"></div>
       <Alert severity="success" className='flex flex-col'>
       <h1 className='text-xl'>Doctor's Registration form is submitted <strong>successfully</strong>.</h1>
       <h1 className='text-xl'>Thank you for your registration.</h1>
       </Alert>

       </div>
    </div>
    </>
  )
}

export default page