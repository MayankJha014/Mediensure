"use client";
import Nav from '@/Components/Nav/Nav'
import Sidebar from '@/Components/Sidebar/Sidebar'
import { getInstitute } from '@/store/Action/Authentication';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const dispatch = useDispatch();
    const {institute,loading} = useSelector((state)=>state.adminReducer)
    useEffect(() => {
   dispatch(getInstitute());
    }, [])
    console.log(institute,486);

  return (
    <>
    <Nav/>
    <div className="w-full bg-white relative overflow-hidden flex" style={{height:"calc(100vh - 10vh)"}}>
        <Sidebar/>
        <div className="w-full h-full flex flex-col gap-10 p-10 relative overflow-y-auto">
            <h1 className='text-2xl'>Institute's Details</h1>
            <div className="overflow-x- w-full">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                  <th>S. No.</th>

                    <th>Name of Inst.</th>
                    <th>Type</th>
                    <th>Address</th>
                    <th>Specialities</th>
                    <th>Doctor Name</th>
                    <th>Pin Code</th>
     
                  </tr>
                </thead>
                <tbody>
                  {institute?.map((dets, index) => (
                    <tr key={index}>
                         <th >
                        {index + 1}
                      </th>
                      <th >
                        {dets?.institutionName}
                      </th>
                      <td>
                       {dets?.type}
                      </td>
                      <td>
                       {dets?.address}
                      </td>
                      <td>{dets?.specialities}</td>
                      <td >
                      {dets?.personName}
                      </td>
                      <th>
                     {dets?.pinCode}
                      </th>
    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default page