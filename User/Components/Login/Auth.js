"use client"
import React, { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from '@/store/Action/auth'
import { useRouter } from 'next/navigation'

const Auth = () => {
    const [open, setopen] = useState(0)
const {isAuthencticated} = useSelector((state)=>state.auth);
const dispatch = useDispatch();
const router = useRouter();
console.log(isAuthencticated,123);
useEffect(() => {
dispatch(checkUser());
if(isAuthencticated === true){
router.push("/mediensure/verifyauth")
}
}, [isAuthencticated])

  return (
  <div className="h-screen w-full flex flex-col   items-end justify-end " >
    <div className="flex w-full flex-col justify-center items-center " style={{height:"calc(100vh - 75vh)"}}>
    <div className=' h-20 w-full shadow-md  flex items-center mt-10  pt-4 justify-center  '>
    <button  onClick={()=>setopen(0)} className="bg-white rounded-full  text-[#567237] font-bold py-2 px-4 ">
  LOGIN

  {
    open === 0 ?  <div className='h-[1px] w-10 bg-[#567237]'></div>
: ""
  }
  
</button>
<button  onClick={()=>setopen(1)} className="bg-white rounded-full  text-[#567237] font-bold py-2 px-4 ">
  REGISTER
  {
    open === 1 ?  <div className='h-[1px] w-16 bg-[#567237]'></div>
: ""
  }
</button>
         </div>







   
    </div>


  {
   
    open === 0 ? <Login/> : ""
  }
  {
    open === 1 ?<Register/> : ""
  }


  </div>
  )
}

export default Auth