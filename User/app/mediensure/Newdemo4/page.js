import Footer from '@/Components/Footer/Footer'
import Nav from '@/Components/Nav/Nav'
import Newdemo42 from '@/Components/Newdemo42/Newdemo42'
import Newdemo43 from '@/Components/Newdemo43/Newdemo43'
import Newdemo44 from '@/Components/Newdemo44/Newdemo44'
import ResFooter from '@/Components/ResFooter/ResFooter'
import React from 'react'

const page = () => {
  return (
    <>
    <Nav/>
    <div className='overflow-hidden w-full  relative'>
    <Newdemo44/>
    <Newdemo42/>
    <Newdemo43/>
    <ResFooter/>
    </div>
    <Footer/>
    </>
  )
}

export default page