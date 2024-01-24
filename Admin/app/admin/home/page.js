// "use client";

// import HomeFirst from '@/Components/PreInsurance/Home/HomeFirst'
// import { getadmin } from '@/store/Action/Authentication';
// import { useRouter } from 'next/navigation';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';

// const page = () => {
//   const { message,error,isAuthenticated } = useSelector((state) => state.adminReducer);
//   const router = useRouter()
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getadmin())

//    if(!isAuthenticated){
//     router.push("/admin/Auth")
//    }
//   }, [isAuthenticated])
//   return (
//   <HomeFirst/>
//   )
// }

// export default page
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page