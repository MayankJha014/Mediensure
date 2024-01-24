"use client"
import React, { useEffect, useState } from 'react'

const PatientDets = ({data,setindex}) => {
    console.log(data,123);
    const [todayConsult, settodayConsult] = useState([])
    useEffect(() => {
        const date = new Date();
        const d = date.getDate() +"-" + (date.getMonth() + 1) + "-" + date.getFullYear() 
        console.log(String(d),458);
      const filter = data?.consultation?.filter((i)=>i?.date === String(d));
      settodayConsult(filter)
    }, [])
    console.log(todayConsult,458);
  return (
    <>
    <div className="w-full p-10">
    <i className="ri-arrow-left-line cursor-pointer text-2xl" onClick={()=>setindex(null)}></i>
    <div className="grid grid-cols-2 grid-rows-2 h-[40vh] w-[50%] gap-4 px-10">
        <div className="w-full rounded-xl bg-blue-400 bg-opacity-25 text-black p-2 flex flex-col items-center justify-center border-2">
            <h1>Total Consultations</h1>
            <h1>{data?.consultation?.length}</h1>
        </div>
        <div className="w-full rounded-xl bg-blue-400 bg-opacity-25 flex flex-col items-center justify-center border-2">
            <h1>Today's Consultations</h1>
            <h1>{todayConsult?.length}</h1>

        </div>
        <div className="w-full rounded-xl bg-blue-400 bg-opacity-25 flex flex-col items-center justify-center border-2">
            <h1>Total Transactions</h1>
        </div>
        <div className="w-full rounded-xl bg-blue-400 bg-opacity-25 flex flex-col items-center justify-center border-2">
            <h1>Today's Transactions</h1>
        </div>
    </div>
    </div>
    </>
  )
}

export default PatientDets