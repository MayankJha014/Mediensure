"use client";
import { createLead } from "@/store/Action/others";
import { clearMessage } from "@/store/Reducer/others";
import { colors } from "@mui/material";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page8 = () => {
  const [number, setnumber] = useState("");
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { message, load } = useSelector((state) => state.others);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (message) {
      showModal();
      dispatch(clearMessage());
    }
  }, [message, load]);
  const homeSubmit = () => {
    const regex = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const isPhoneNumberValid = regex.test(number);
    // const isPhoneNumberValid = regex.test(number);

    // console.log('Number:', number);
    // console.log('isPhoneNumberValid:', isPhoneNumberValid);

    if (isPhoneNumberValid) {
      if (number?.length > 10 || number?.length < 10 || number === "") {
        return toast.error("Please Enter correct number");
      }
      const info = {
        data: {
          number: number,
        },
        role: "homepage",
      };
      dispatch(createLead(info));
    } else {
      toast.error("Enter a correct phone number");
    }
  };

  return (
    <>
      <div className="h-screen w-full  flex justify-center items-center  flex-col pt-24 max-md:hidden">
        <button
          class="text-white font-semibold py-2 w-56 h-12 px-4 rounded"
          style={{ backgroundColor: "#8da473" }}
        >
          More Posts
        </button>

        <div className="h-screen w-full  flex ">
          <div className="h-full w-1/2 relative  flex justify-center items-center">
            <img className="absolute top-32 w-28" src="/medic.png" alt="" />
            <img
              className="h-80 absolute top-40 left-48"
              src="/man.png"
              alt=""
            />
            <img className="h-96" src="/phn.png" alt="" />
            <img
              className="h-10 absolute   left-72"
              style={{ top: "70%" }}
              src="/cut2.png"
              alt=""
            />
            <img
              className="h-7 absolute   "
              style={{ top: "71%", left: "46.5%" }}
              src="/cut.png"
              alt=""
            />
            <img
              className="h-44 absolute"
              style={{ top: "33%", left: "64.5%" }}
              src="/women.png"
              alt=""
            />
          </div>
          <div className="h-full px-24 py-28 w-1/2 flex-col flex gap-5">
            <div className="w-full  flex flex-col   items-start  gap-4  text-black">
              <h1 className="text-2xl font-semibold">
                Download the MediEnsure App
              </h1>
              <p className="" style={{ color: "#8c8c8c" }}>
                Access video consultation with India’s top doctors on the Practo
                app. Connect with doctors online, available 24/7, from the
                comfort of your home.
              </p>
            </div>

            <h1 className="text-lg mt-16 font-medium">
              Get the link to download the app
            </h1>

            <div className="h-16  w-[34vw]  flex gap-8  items-center">
              <input
                type="number"
                value={number}
                maxLength={10}
                minLength={10}
                onChange={(e) => setnumber(e.target.value)}
                placeholder="Enter Phone number"
                className="input py-3 px-10 input-bordered w-64 border-2 rounded-lg "
              />
              <button
                onClick={homeSubmit}
                class=" text-white font-bold py-2 border-4  w-64 px-4 rounded-lg"
                style={{ color: "#567237", borderColor: "#567237" }}
              >
                Submit
              </button>
            </div>

            <div className="h-16  w-[34vw]  flex gap-8  items-center">
              <button className="btn pl-4 text-xs   bg-black flex items-center gap-3 h-12 w-32 rounded-lg">
                <img src="/playstore.png" alt="" />

                <div className="h-10 flex text-white flex-col items-start justify-start w-full">
                  <h1 className="text-xs">Get IT ON</h1>
                  <h2 className="text-sm font-semibold"> Google Play</h2>
                </div>
              </button>

              <button className="btn pl-3 bg-black flex f items-center gap-2 h-12 w-36 rounded-lg">
                <img src="/apple.png" alt="" />

                <div className="h-10 flex text-white flex-col w-full items-start justify-start">
                  <h1 className="text-xs">Download on the</h1>
                  <h2 className="text-sm font-semibold"> App Store</h2>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Your Request sent successfully"
        open={isModalOpen}
        onOk={handleOk}
        centered
        footer={
          <Button
            style={{ backgroundColor: "#52c41a", color: "white" }}
            onClick={handleOk}
          >
            Ok
          </Button>
        }
      >
        <h1>Mediensure Team will contact you as soon as possible.</h1>
        <h1>Thank you for reaching us</h1>
      </Modal>
    </>
  );
};

export default Page8;
