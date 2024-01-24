import Demo1 from '@/Components/Demo1/Demo1'
import Demo2 from '@/Components/Demo2/Demo2'
import Demo3 from '@/Components/Demo3/Demo3'
import Demo4 from '@/Components/Demo4/Demo4'
import Footer from '@/Components/Footer/Footer'
import Nav from '@/Components/Nav/Nav'
import ResFooter from '@/Components/ResFooter/ResFooter'
import React from 'react'

const page = () => {
  
  return (
    <>
    <Nav/>
    <Demo1/>
    <Demo2/>
    <Demo3/>
    <Demo4/>
    <ResFooter/>
    <Footer/>
    </>
  )
}

export default page