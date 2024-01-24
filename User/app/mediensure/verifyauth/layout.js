"use client"

import { checkUser } from '@/store/Action/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const layout = ({children}) => {
const {user,isAuthencticated} = useSelector((state)=>state.auth);
const dispatch = useDispatch();
const router = useRouter();
useEffect(() => {
    const fetchData = async () => {
      await dispatch(checkUser());
      if (!isAuthencticated) {
        setTimeout(() => {
          router.push("/mediensure/auth");
        }, 1000);
      } else {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    };

    fetchData();
  }, []);

  return (
    children
  )
}

export default layout