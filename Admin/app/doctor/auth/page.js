"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


const auth = () => {
  const router = useRouter()
  useEffect(() => {
    
    
   router.push("/doctor/dashboard")
  }, [])
  
  return (
   <></>
  )
}

export default auth