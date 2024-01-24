import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-full  flex items-center justify-center'>
       <CircularProgress/>
    </div>
  )
}

export default Loading