import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./Ivf.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const IVFReview = ({ deleteReview,setopen, data, imgLink}) => {
useEffect(() => {

}, [data,imgLink])

  return (
    <>
      <div className="w-full flex flex-col  gap-4">
        <Button
          variant="contained"
          className="w-fit bg-blue-500"
          onClick={() => setopen(true)}
        >
          Add Review
        </Button>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className={styles.swiper}
          loop={true}
        >
          {data?.map((dets, index) => (
            <SwiperSlide 
            key={index}
              style={{ display: "flex" }}
              className="w-full h-full  flex-col items-center justify-center relative bg-gray-200 rounded-xl" 
            >
              <img
                src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                alt=""
                className="h-[10vw] w-[10vw] rounded-full object-contain"
              />
              <p className="w-[80%] text-center">
                {dets?.description}
              </p>
              <h4>{dets?.name}</h4>
              <i onClick={()=>deleteReview(dets?._id)} className="ri-close-circle-fill absolute top-0 right-0 text-red-500 text-3xl "></i>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </>
  );
};

export default IVFReview;
