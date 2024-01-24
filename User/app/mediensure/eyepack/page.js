import Eyeplan1 from '@/Components/Eyeplan1/Eyeplan1'
import Eyeplan2 from '@/Components/Eyeplan2/Eyeplan2'
import Eyeplan4 from '@/Components/Eyeplan4/Eyeplan4'
import Eyeplan5 from '@/Components/Eyeplan5/Eyeplan5'
import Footer from '@/Components/Footer/Footer'
import Nav from '@/Components/Nav/Nav'
import ResFooter from '@/Components/ResFooter/ResFooter'
import Eyeplan3 from '@/Components/eyeplan3/Eyeplan3'
import React from 'react'

const page = () => {
  return (
    <>
    <Nav/>
    <Eyeplan1/>
    <Eyeplan2/>
    <Eyeplan3/>
    <Eyeplan4/>
    <Eyeplan5/>
    <ResFooter/>
    <Footer/>

    </>
  )
}

export default page