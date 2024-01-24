"use client";

import Loader from "@/Components/Loader";
import { prescriptionDetail } from "@/store/Action/others";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print'
import { toast } from "react-toastify";
const PrescriptionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "Prescption-Page",
      onAfterPrint: () => toast.success('Successfully printed')
  })
  const { prescription, load } = useSelector((state) => state.others);
  useEffect(() => {
    dispatch(prescriptionDetail(id));
  }, []);
  const formattedDate = new Date(prescription?.createdAt).toLocaleDateString(
    "en-GB"
  );
  console.log(prescription, 486);
  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div className="w-full relative overflow-y-auto h-full">
          <div className="w-[21cm] min-h-[29.5cm] overflow-auto mx-auto my-8 border-2 border-black bg-white relative">
            <div ref={componentRef} className="flex flex-col">
              <div className="flex justify-between h-32 border-b-2 border-black relative">
                <div className="flex flex-col items-center relative w-1/3">
                  <h1 className="text-xl text-indigo-700 font-bold mt-5 mx-5">
                    {prescription?.consultation?.doctor?.firstname}{" "}
                    {prescription?.consultation?.doctor?.lastname}
                  </h1>
                  {/* <p className="text-sm font-medium self-center ">
                  M.B.B.S, M.D, M.S
                </p> */}
                  <p className="text-sm font-medium self-center">
                    Mob No: +91 {prescription?.consultation?.doctor?.number}
                  </p>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  {/* <img src={"/navlogo.png"} alt="" className="w-16 h-16 mt-5" /> */}
                  <div className="flex justify-center">
                    <h1 className="text-2xl font-semibold text-[#5c792e] font-roboto">
                      Mediensure
                    </h1>
                  </div>
                </div>
                <span className="w-1/3"></span>
                {/* <div className="flex flex-col items-center w-1/3">
                                    <h1 className="text-xl text-indigo-700 font-bold mt-5 mx-5">
                                        R.C.D.S{" "}
                                    </h1>
                                    <p className="text-sm font-medium self-center ">
                                        Pipalner Road, Bhopal, 462036
                                    </p>
                                    <p className="text-sm font-medium self-center">
                                        Mob No: +91 7440777333
                                    </p>
                                </div> */}
              </div>

              <div className="flex flex-col justify-start w-[10cm]">
                <p className="text-base mx-2 font-semibold mt-2 font-roboto">
                  Description : {prescription?.description}
                </p>
              </div>
              {/* <div className="flex flex-col justify-start w-[10cm] mt-3">
              <p className="text-base mx-2 font-bold mt-2 font-roboto">
                Known History of
              </p>
              <p className="text-base mx-2 font-roboto font-normal leading-7">
                1. Blood Pressure
              </p>
              <p className="text-base mx-2 font-roboto font-normal leading-5"></p>
            </div> */}
              <div className="flex justify-center">
                <img
                  src={"/navlogo.png"}
                  alt=""
                  className="absolute opacity-25 w-2/5"
                />
              </div>
              <div className="flex flex-col justify-start my-5">
                {/* <div className="flex border-t-4 border-b-2 border-black justify-around bg-slate-400">
                                    <h1 className="font-roboto font-bold text-lg">
                                        Chief Complaints
                                    </h1>
                                    <h1 className="font-roboto font-bold text-lg">
                                        Clinical Findings
                                    </h1>
                                </div>
                                <div className="flex border-t-2 border-b-2 border-black justify-around">
                                    <h1 className="font-roboto font-normal text-lg">1. Acidity</h1>
                                    <h1 className="font-roboto font-normal text-lg">2. Finding</h1>
                                </div>
                                <div className="flex flex-col justify-start my-3">
                                    <p className="text-base mx-2 font-bold mt-2 font-roboto">
                                        Notes :
                                    </p>
                                    <p className="text-base mx-2 font-roboto font-medium leading-7">
                                        Sample Internal Notes
                                    </p>
                                </div>
                                <div className="flex flex-col justify-start w-[10cm]">
                                    <p className="text-base mx-2 font-bold mt-2 font-roboto">
                                        Diagnosis :
                                    </p>
                                    <p className="text-base mx-2 font-roboto font-medium leading-7">
                                        1. Fever
                                    </p>
                                </div>
                                <div className="flex flex-col justify-start my-3">
                                    <p className="text-base mx-2 font-bold mt-2 font-roboto">
                                        Procedures Conducted
                                    </p>
                                    <p className="text-base mx-2 font-roboto font-normal leading-7">
                                        1. {prescriptiondetail?.procedureConducted}
                                    </p>
                                </div> */}

                <div className="flex flex-col justify-start my-5">
                  <div className="flex border-t-4 border-b-2 border-black justify-around bg-slate-400">
                    <h1 className="font-roboto font-bold text-lg">
                      Medicine Name
                    </h1>
                    <h1 className="font-roboto font-bold text-lg">Dosage</h1>
                    <h1 className="font-roboto font-bold text-lg">Duration</h1>
                  </div>

                  <div className=" border-b-2 border-black flex flex-col odd:justify-end">
                    {prescription?.medicines &&
                      prescription?.medicines?.map((medicine, index) => (
                        <div className="flex border-t-2 border-black justify-around py-4 ">
                          <h1 className="font-roboto font-normal text-base text-center w-1/4 ml-4">
                            {/* 1. TAB. DEMO MEDICINE 1 */}
                            {medicine?.medName}
                          </h1>
                          <div className="flex flex-col w-1/4 items-center self-center ml-4">
                            <h1 className="font-roboto font-normal text-base text-center">
                              {/* 1 MORNING, 1 NIGHT */}
                              {medicine?.dosage}
                            </h1>
                            <h1 className="font-roboto font-normal text-base text-center">
                              {/* (Before Food){" "} */}({medicine?.timing}){" "}
                            </h1>
                          </div>
                          <div className="flex flex-col w-1/4 items-center">
                            <h1 className="font-roboto font-normal text-base text-center">
                              {/* 8 Days */}
                              {medicine?.duration} Days
                            </h1>
                            <h1 className="font-roboto font-normal text-base text-center">
                              {/* (Tot: 20 Tab){" "} */}
                              (Tot: {medicine?.quantity} Tab){" "}
                            </h1>
                          </div>
                        </div>
                      ))}
                    {/* <div className="flex border-black border-b-2 border-t-4 py-4 last:mt-auto bg-slate-400">
                                            <h1 className="font-roboto text-lg font-extrabold ml-auto mx-4">
                                                Total-Amount : 50000
                                            </h1>
                                        </div> */}
                  </div>
                </div>
                {/* <div className="flex flex-col justify-start">
                <p className="text-base mx-2 font-bold mt-2 font-roboto">
                  Lab Test:
                </p>
                <p className="text-base mx-2 font-roboto font-normal leading-7">
                  1. X-Ray
                </p>
                <p className="text-base mx-2 font-roboto font-normal leading-5">
                  2. P-53
                </p>
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-base mx-2 font-bold mt-2 font-roboto">
                  Advice Given :
                </p>
                <p className="text-base mx-2 font-roboto font-normal leading-7">
                  1. Avoid Oily And Spicy Food
                </p>
              </div> */}
                <div className="flex">
                  <p className="text-base mx-2 font-bold my-3 font-roboto">
                    {/* Date : 26-Dec-2022, 10:30 AM */}
                    Date : {formattedDate}
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className="flex flex-col items-end relative w-[6cm]">
                    <p className="self-center">Signature</p>
                    <h1 className="text-xl text-indigo-700 font-bold self-center">
                      {prescription?.consultation?.doctor?.firstname}{" "}
                      {prescription?.consultation?.doctor?.lastname}
                    </h1>
                    {/* <p className="text-sm font-medium self-center">
                    M.B.B.S, M.D, M.S
                  </p> */}
                    <p className="text-sm font-medium self-center">
                      Mob No: +91 {prescription?.consultation?.doctor?.number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            // type="button"
            onClick={handlePrint}
            className="p-4 px-14 rounded-lg ml-[10vw] bg-green-600 text-white ease-linear transition-all duration-300 hover:shadow-md hover:bg-green-700"
          >
            Print
          </button>
        </div>
      )}
    </>
  );
};

export default PrescriptionPage;
