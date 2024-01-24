import { createLead } from "@/store/Action/others";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { clearMessage } from "@/store/Reducer/others";
const Consulting1 = ({ data, imgLink }) => {
  const { load, message } = useSelector((state) => state.others);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  }, [data, imgLink, message, load]);
  const submitHandler = (e) => {
    e.preventDefault();
    const t = e.target;
    if (
      t.name.value === "" ||
      t.email.value === "" ||
      t.contact.value === "" ||
      t.city.value === ""
    ) {
      return toast.error("Please fill all the values");
    }
    const info = {
      data: {
        name: t.name.value,
        contact: t.contact.value,
        email: t.email.value,
        city: t.city.value,
      },
      role: "ivf",
    };
    dispatch(createLead(info));
    t.name.value = "";
    t.email.value = "";
    t.contact.value = "";
    t.city.value = "";
  };
  return (
    <>
      <div className="h-screen w-full py-20 flex items-center  justify-center max-md:h-fit max-md:py-5  bg-[#7e9467]">
        <img
          className="w-1/2  object-contain"
          src={`${imgLink}/${data?.filename}/${data?.mimetype}`}
          alt="IVF IMAGE"
        />
        <form
          className="w-1/2 flex items-center justify-center bg-[#7e9467] h-full"
          onSubmit={submitHandler}
        >
          <div className="form-control  w-[60%]  flex flex-col gap-2 max-md:gap-0 bg-white bg-opacity-50 p-10 rounded-xl">
            {/* <select value={select} onChange={(e)=>setselect(e.target.value)} className="select select-bordered w-full max-w-xs px-2 py-1">
                  <option  selected>
                    Provider
                  </option>
                  <option>Demo</option>
                  <option>Test</option>
                </select> */}
            <h1 className="w-full text-center font-semibold text-2xl">
              BOOK YOUR APPOINTMENT
            </h1>
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
              className="input  max-md:h-fit max-md:py-0  border-2   w-full max-w-xs p-2 rounded-lg"
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
              className="input  max-md:h-fit max-md:py-0  border-2   w-full max-w-xs p-2 rounded-lg"
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
              className="input  max-md:h-fit max-md:py-0  border-2   w-full max-w-xs p-2 rounded-lg"
            />
            <label className="label">
              {/* <span className="label-text-alt">Bottom Left label</span> */}
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </label>

            <label className="label">
              <span className="text-xl max-md:text-[10px] font-medium">
                City
              </span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <input
              type="text"
              placeholder="City Name"
              name="city"
              className="input  max-md:h-fit max-md:py-0  border-2   w-full max-w-xs p-2 rounded-lg"
            />
            <label className="label">
              {/* <span className="label-text-alt">Bottom Left label</span> */}
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </label>

            <button
              class="w-fit ml-28 max-md:ml-[30%] max-md:mt-2 max-md:text-[8px]  max-md:py-1 max-md:px-3 text-white font-bold py-2 px-6  rounded-xl"
              style={{ backgroundColor: "#567237" }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Modal
        title="Your Request sent successfully"
        open={isModalOpen}
        onOk={handleOk}
        centered
        footer={<Button style={{backgroundColor: '#52c41a', color: 'white'}} onClick={handleOk}>Ok</Button>}
      >
        <h1>Mediensure IVF Team will contact you as soon as possible.</h1>
        <h1>Thank you for reaching us</h1>
      </Modal>
    </>
  );
};

export default Consulting1;
