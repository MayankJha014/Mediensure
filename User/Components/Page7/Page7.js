"use client";
import { createLead } from '@/store/Action/others';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Divider, Modal } from "antd";
import { clearMessage } from '@/store/Reducer/others';
import Link from 'next/link';

const Page7 = ({ data, post,imgLink }) => {
  const [number, setnumber] = useState("");
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { message, load } = useSelector((state) => state.others);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // useEffect(() => {
  //   if (message) {
  //     showModal();
  //     dispatch(clearMessage());
  //   }
  // }, [message, load]);
  const homeSubmit = () => {
    const regex = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const isPhoneNumberValid = regex.test(number);
    // const isPhoneNumberValid = regex.test(number);
  
    // console.log('Number:', number);
    // console.log('isPhoneNumberValid:', isPhoneNumberValid);
  
    if (isPhoneNumberValid) {
      if(number?.length > 10 || number?.length < 10 || number === ""){
        return toast.error("Please Enter correct number")
      }
      const info = {
        data: {
          number: number,
        },
        role: "homepage",
      };
      dispatch(createLead(info));
      setnumber("")
    } else {
      toast.error("Enter a correct phone number");
    }
  };
  return (
    <>
      <div className="min-h-screen  w-full flex  flex-col items-center pt-16 max-md:h-fit ">
        <h1 className="text-white text-xl " style={{ color: "#5c5c5c" }}>
          Latest Blog
        </h1>
        <div className="h-screen w-full  flex flex-row gap-1 max-md:flex-col max-md:h-fit">
          <div className="h-full px-24 py-4 w-[70%] flex items-start justify-start flex-col gap-3 max-md:w-full max-md:p-2  max-md:justify-center max-md:items-center ">
            {data?.map((dets, index) =>
              dets?.shown ? (
                <Link className='w-[95%]' href={`/mediensure/blog/${dets?._id}`}>
                     <div
                  className="h-fit w-full flex flex-col items-start pl-5 py-2 gap-2 "
                  style={{ boxShadow: "0px 0px 1px 2px  #d6d6d6" }}
                  key={index}
                >
                  <h1 className="text-2xl font-medium">{dets?.heading}</h1>
                  <p>{dets?.content}</p>
                  <Divider className="w-full h-0.5 bg-gray-200" />
                  <h3>{dets?.date}</h3>
                </div>
                </Link>
           
              ) : (
                ""
              )
            )}

            <div></div>
            <div></div>
            {/* <InsetDividers/> */}
          </div>
          <div className="h-screen w-96 flex flex-col gap-2 pr-10 py-3 justify-start items-center max-md:h-fit  ">
            <div
              className="h-52  w-full  flex flex-col gap-2 items-start px-5 py-4 max-md:hidden"
              style={{ backgroundColor: "#8da473" }}
            >
              <h1 className="text-xl  font-medium text-white">
                Medicare Health <br />
                Blog Newsletter
              </h1>
              <p className=" text-sm w-52 font-medium text-white">
                Join the newsletter to receive the latest updates in your inbox.
              </p>
              <div className="flex bg-white py-1 px-5 input-bordered  border-2 rounded-lg gap-2 w-fit ">
              <input
                type="text"
                placeholder="Enter Phone number"
           value={number}
           onChange={(e)=>setnumber(e.target.value)}
                className="input outline-none w-56"
              />
              <i className="ri-send-plane-fill cursor-pointer" onClick={homeSubmit}></i>
              </div>
             
            </div>
            <div className="h-96 w-full flex flex-col gap-5 max-md:justify-center max-md:items-start  max-md:pl-7">
              <h1>FEATURES POSTS </h1>
              {post?.map((dets, index) => (
                dets?.shown === true ? 
                <Link href={`/mediensure/post/${dets?.uid}`}>
                <div
                key={index}
                  className="h-fit w-full flex  gap-2 items-center p-2 justify-between px-6 max-md:justify-center max-md:items-center "
                  style={{ boxShadow: "0px 0px 1px 2px  #d6d6d6" }}
                >
                  <div className="flex flex-col gap-1">
                    <h1>{dets?.heading}</h1>
                    <h2 className="text-xs ">{dets?.date}</h2>
                  </div>

                  <img
                    className="h-full w-24 object-contain"
                    src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                    alt=""
                  />
                </div>
                </Link>
                 : ""
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Page7;
