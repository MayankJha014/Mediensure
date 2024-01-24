"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


const auth = () => {
  const router = useRouter()
  useEffect(() => {
    
    
   router.push("/operation/patient")
  }, [])
  
  return (
   <></>
  )
}

export default auth