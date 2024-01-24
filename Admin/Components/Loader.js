import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <>
        <div className="w-full relative h-full flex items-center justify-center">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
    </>
  )
}

export default Loader