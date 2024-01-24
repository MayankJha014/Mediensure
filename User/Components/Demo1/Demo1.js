"use client";
import { createLead } from "@/store/Action/others";
import { clearMessage } from "@/store/Reducer/others";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Demo1 = () => {
  const [select, setselect] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {message,load} = useSelector((state)=>state.others)
  const dispatch = useDispatch();

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
  }, [ message, load]);
  const submitHandler = (e) => {
    e.preventDefault();
    const t = e.target;
    if (
      t.name.value === "" ||
      t.email.value === "" ||
      t.contact.value === "" ||
      t.institution.value === ""
    ) {
      return toast.error("Please fill all the values");
    }
    const info = {
      data: {
        reachingFor: select,
        name: t.name.value,
        contact: t.contact.value,
        email: t.email.value,
        institution: t.institution.value,
      },
      role: "provider",
    };
    dispatch(createLead(info));
    t.name.value = "";
    t.email.value = "";
    t.contact.value = "";
    t.institution.value = "";
    setselect("");
  };
  return (
    <>
      <div
        className="h-screen w-full max-md:w-full  bg-slate-300 flex items-center justify-center gap-10  max-md:h-[40vh]  max-md:py-9 "
        style={{
          backgroundImage: "url(/d1.png)",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div className="  flex gap-10 max-md:gap-5 w-fit  max-md:px-4   items-center pt-16 justify-center  ">
          <h1 className="text-white   w-1/2 max-md:w-40 font-bold text-center text-5xl max-md:text-xs ">
            Trusted Brand for Healthcare Network
          </h1>

          <div
            className="h-fit w-[33%]  max-md:w-[50%]  max-md:h-[30vh]   z-10 rounded-xl px-4 py-3  max-md:px-2 max-md:py-2"
            style={{ backgroundColor: "#ffffffd6" }}
          >
            <form onSubmit={submitHandler}>
              <div className="form-control  w-full max-w-xs flex flex-col gap-2 max-md:gap-0">
                <label className="label">
                  <span className="text-xl max-md:text-[10px] font-medium">
                    You are reaching out as:
                  </span>
                  {/* <span className="label-text-alt">Top Right label</span> */}
                </label>

                <select
                  value={select}
                  onChange={(e) => setselect(e.target.value)}
                  className="select select-bordered w-full max-w-xs px-2 py-1"
                >
                  <option selected>Provider</option>
                  <option>Demo</option>
                  <option>Test</option>
                </select>
                <label className="label">
                  {/* <span className="label-text-alt">Bottom Left label</span> */}
                  {/* <span className="label-text-alt">Bottom Right label</span> */}
                </label>

                <label className="label">
                  <span className="text-xl max-md:text-[10px] font-medium">
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
                  <span className="text-xl max-md:text-[10px] font-medium">
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
                  <span className="text-xl max-md:text-[10px] font-medium">
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
                <label className="label">
                  {/* <span className="label-text-alt">Bottom Left label</span> */}
                  {/* <span className="label-text-alt">Bottom Right label</span> */}
                </label>

                <label className="label">
                  <span className="text-xl max-md:text-[10px] font-medium">
                    Institution Name
                  </span>
                  {/* <span className="label-text-alt">Top Right label</span> */}
                </label>
                <input
                  type="text"
                  placeholder="Institution Name"
                  name="institution"
                  className="max-md:h-fit max-md:py-0  rounded-md border-2  w-full max-w-xs px-2 py-1 max-md:placeholder:text-sm"
                />
                <label className="label">
                  {/* <span className="label-text-alt">Bottom Left label</span> */}
                  {/* <span className="label-text-alt">Bottom Right label</span> */}
                </label>

                <button
                  class="w-fit ml-28 max-md:ml-[30%] max-md:mt-2 max-md:text-[8px]  max-md:py-1 max-md:px-3 text-white font-bold py-2 px-6  rounded-sm "
                  style={{ backgroundColor: "#567237" }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        title="Your Request sent successfully"
        open={isModalOpen}
        onOk={handleOk}
        centered
        footer={<Button style={{backgroundColor: '#52c41a', color: 'white'}} onClick={handleOk}>Ok</Button>}
      >
        <h1>Mediensure Team will contact you as soon as possible.</h1>
        <h1>Thank you for reaching us</h1>
      </Modal>
    </>
  );
};

export default Demo1;
