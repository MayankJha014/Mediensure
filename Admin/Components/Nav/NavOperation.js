"use client";
import { getOperator, getadmin, signoutadmin } from '@/store/Action/Authentication';
import { clearError, clearmessage } from '@/store/Reducer/AdminReducer';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const NavOperation = () => {
    const { message,error,loading,isAuthenticatedOperator,admin } = useSelector((state) => state.adminReducer);
const router = useRouter()
const dispatch = useDispatch();
useEffect(() => {
  // dispatch(call())
  dispatch(getOperator())
  // if(error.length !== 0){
  //   error.map((e)=>(
  //     setactive(true),
  //     setalert(e)
  //   ))


  // }

//   console.log(isAuthenticatedOperator);

}, []);
useEffect(() => {
if(message){
  toast.success(message)
  dispatch(clearmessage())
}
if(error){
  toast.error(error);
  dispatch(clearError())
}
if(!isAuthenticatedOperator){
  router.push("/operation/auth")
}
}, [message,error,loading,isAuthenticatedOperator])


  return (
    <>
    <div className="w-full h-20 py-4 flex justify-between bg-white items-center px-12">
        <div className="flex items-center justify-between w-[45%]">
        <img className='object-contain' src={"/navlogo.png"} alt="" />
        <div className="flex items-center justify-center px-3 py-2  bg-[#EFF0F2] gap-3 rounded-lg">
        <i className="ri-search-line text-[#98A1B0]"></i>
        <input type="search" className='outline-none w-[15vw]  border-none bg-transparent'  placeholder='Search'/>
        </div>
        </div>
        <div className="flex items-center justify-start w-[30%] gap-5">
            <div className="w-8 flex items-center justify-center h-8 rounded-full bg-[#EFF0F2]">
            <i className="ri-question-mark"></i>
            </div>
            <div className="flex items-center justify-center gap-2 ">
            <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                //   src={doctor?.avatar?.url}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href={"/admin/setting"}>Settings</Link>
              </li>
              <li >
                <a>Logout</a>
              </li>
            </ul>
          </div>
                <div className="grid grid-cols-1">
                    <h1 className='text-base'>{admin?.name}</h1>
                    <h3 className='text-xs'>{admin?.email}</h3>
                </div>
                {/* {isAuthenticatedOperator === false ? ""  : <Button onClick={()=>dispatch(signoutadmin())} variant='outlined'>LOGout</Button> } */}
            </div>
        </div>
    </div>
    </>
  )
}

export default NavOperation