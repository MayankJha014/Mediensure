"use client";
import Footer from "@/Components/Footer/Footer";
import Last1 from "@/Components/Last1/Last1";
import Last2 from "@/Components/Last2/Last2";
import Last3 from "@/Components/Last3/Last3";
import Last4 from "@/Components/Last4/Last4";
import Nav from "@/Components/Nav/Nav";
import { createLead, getProductById } from "@/store/Action/others";
import { Box, CircularProgress } from "@mui/material";
import { Button, Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const { load, product, imgLink } = useSelector((state) => state.others);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id));
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const showDialog = () => {
    setIsDialog(true);
  };
  const handleDialog = () => {
    setIsDialog(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const t = e.target;
    if (
      t.name.value === "" ||
      t.email.value === "" ||
      t.contact.value === "" 
    ) {
      return toast.error("Please fill all the values");
    }
    const info = {
      data: {
        name: t.name.value,
        contact: t.contact.value,
        email: t.email.value,
        product:product?.name
      },
      role: "Product",
    };
    dispatch(createLead(info));
    t.name.value = "";
    t.email.value = "";
    t.contact.value = "";
  };
  return (
    <>
      <Nav />
      {!load ? (
        <div className="w-full relative h-screen flex items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className="con translate-y-[10vh]">
          <Last1 imgLink={imgLink} data={product?.img} />
          <Last2 data={product} />
          <Last3 data={product} />
          <Last4 show={showModal} />
          <Footer />
        </div>
      )}
      <Modal
        title="Contact to order"
        open={isModalOpen}
        onOk={handleOk}
        centered
        onCancel={handleOk}
        footer={
        ""
        }
      >
        <form onSubmit={submitHandler}>
          <div className="form-control  w-full max-w-xs flex flex-col gap-2 max-md:gap-0 items-start justify-center">
            <label className="label">
              <span className="text-sm max-md:text-[10px] font-medium">
                Name
              </span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input  max-md:h-fit max-md:py-0  border-2  w-full max-w-xs px-2 py-1"
            />
            <label className="label">
              {/* <span className="label-text-alt">Bottom Left label</span> */}
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </label>

            <label className="label">
              <span className="text-sm max-md:text-[10px] font-medium">
                Contact
              </span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <input
              type="number"
              placeholder="Contact"
              name="contact"
              className="input max-md:h-fit max-md:py-0   border-2  w-full max-w-xs px-2 py-1"
            />
            <label className="label">
              {/* <span className="label-text-alt">Bottom Left label</span> */}
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </label>

            <label className="label">
              <span className="text-sm max-md:text-[10px] font-medium">
                Email Id
              </span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input  max-md:h-fit max-md:py-0  border-2  w-full max-w-xs px-2 py-1"
            />


            <button
              class="w-fit  max-md:ml-[30%] max-md:mt-2 max-md:text-[8px]  max-md:py-1 max-md:px-3 text-white font-bold py-2 px-6  rounded-sm "
              style={{ backgroundColor: "#567237" }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default page;
