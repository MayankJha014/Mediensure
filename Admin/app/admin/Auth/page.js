"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


const auth = () => {
  const router = useRouter()
  useEffect(() => {
    
    
   router.push("/admin/home/banner")
  }, [])
  
  return (
   <></>
  )
}

export default auth