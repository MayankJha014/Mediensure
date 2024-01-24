"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Eyeplan.module.css'


// import required modules
import { Pagination } from 'swiper/modules';

const Eyeplan5 = () => {
  return (
    <>
<div className='h-fit w-full flex flex-col py-5 px-10 gap-10 max-md:gap-1 items-center  '>
<button class="w-fit  text-white font-bold py-2 px-16  rounded-xl" style={{backgroundColor:"#567237"}}>
  Show More
</button>

<div className='h-[50vh] w-full  pb-4 max-md:h-[25vh]'>


<Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className={styles.swiperslide2}>

          <h1 className='font-medium text-4xl max-md:text-xl'>What Our Clients are Saying</h1>

          <p className='text-2xl w-[42vw] mt-5 max-md:text-xs max-md:w-[100vw]'>Excellent customer service and competitive prices. Will definitely order again.</p>
          <h1>-Lakmi Rathore</h1>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
   
      </Swiper>
    
   
</div>
</div>

    </>
  )
}

export default Eyeplan5