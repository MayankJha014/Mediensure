import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page1 = ({ data, imgLink }) => {
  const router = useRouter();
  const [doctor, setdoctor] = useState("")
  useEffect(() => {

  }, [data])
  const search = ()=>{

    router.push(`/mediensure/consultation/${doctor}`)
  }
  return (
    <div className="h-screen w-full relative overflow-hidden   bg-slate-200 flex items-end justify-end">
      <div
        className="h-screen w-full bg-white items-center  pt-10  relative overflow-hidden"
        style={{ height: "calc(100vh - 10vh)" }}
      >
        <div className="w-full  flex items-center -ml-5 justify-center h-fit gap-5 pr-28 max-md:flex-col-reverse">
          <input
            type="text"
            placeholder="Search doctors,clinics,hospital,etc"
            className="outline-none border-2  bg-transparent  p-5   text-xs w-[48vw]  rounded py-3"
            value={doctor}
            onChange={(e)=>setdoctor(e.target.value)}
          />

          <div className=" w-40 h-10 bg-white rounded gap-2 p-5 -ml-7 flex items-center  border-2 justify-center  text-xs">
            {/* <i className="ri-map-pin-line"></i>

            <input
              type="text"
              placeholder="Mumbai"
              className="input input-bordered   h-10 w-full"
            /> */}
            <Button variant="outlined" onClick={search}>
             Search
            </Button>
          </div>
        </div>

        <div className="h-[70vh] w-[80vw]     mt-8 flex   overflow-hidden relative rounded-2xl m-auto justify-center  shadow-md max-md:hidden">
          <div
            className="h-full  w-1/2 flex pl-5 pt-5 gap-2 text-white item-center flex-col
       "
            style={{ backgroundColor: "rgb(141 164 115)" }}
          >
            <h1 className="text-4xl  font-bold">
              Open your health <br /> account
            </h1>
            <p className="font-light">Trust by more than 3Cr Indians</p>
            <div className="h-16 w-80 pl-2  pt-3  flex item-centre   gap-5">
              <button className="btn pl-4 text-xs   bg-black flex items-center gap-3 h-12 w-32 rounded-lg">
                <img src="/playstore.png" alt="" />

                <div className="h-10 flex flex-col items-start justify-start w-full">
                  <h1 className="text-xs">Get IT ON</h1>
                  <h2 className="text-sm font-semibold"> Google Play</h2>
                </div>
              </button>

              <button className="btn pl-3 bg-black flex f items-center gap-2 h-12 w-36 rounded-lg">
                <img src="/apple.png" alt="" />

                <div className="h-10 flex flex-col w-full items-start justify-start">
                  <h1 className="text-xs">Download on the</h1>
                  <h2 className="text-sm font-semibold"> App Store</h2>
                </div>
              </button>
            </div>
            <div className="flex items-end mt-7 p-3 w-full gap-3 justify-center">
              <h1>NHA Approved</h1>
              <h1 className="text-2xl">|</h1>
              <h1>CO-WIN Approved</h1>
              <h1 className="text-2xl">|</h1>
              <h1>Private & Secure</h1>
            </div>
          </div>
          <div className="h-full  w-1/2 flex  items-center">
            <img
              className="h-full w-full object-cover"
              src={`${imgLink}/${data?.filename}/${data?.mimetype}`}
              alt=""
            />


          </div>
        </div>

        <div className="w-full bg-[rgb(141,164,115)] rounded-2xl pt-2 gap-5    h-72 md:hidden mt-10">
          <img className="h-10 mt-2 ml-4" src="/medi logo.png" alt="" />
          <h1 className="text-white mt-4 ml-4 text-2xl font-semibold">
            Live a diabetes-free life
          </h1>
          <h2 className="text-white  ml-4 text-xs font-light">
            Join MediEnsure Diabetes Remission Program
          </h2>

          <h3 className="text-white  ml-4 mt-3 text-sm font-light">
            . Reduce HbA1c{" "}
          </h3>
          <h3 className="text-white  ml-4  text-sm font-light">
            . Reduce HbA1c{" "}
          </h3>
          <Button
            variant="outlined"
            className="h-fit ml-5 mt-8  rounded-lg w-28 text-[rgb(141,164,115)] bg-white "
          >
            Login{" "}
          </Button>
          <img
            className="ml-44 -mt-40 h-52 object-contain"
            src="/dr.png"
            alt=""
          />
        </div>

        <div className="h-52 w-full  flex items-center justify-center pl-2 md:hidden">
          <div
            className="h-20 w-full  flex gap-6 items-center justify-start  "
            style={{ boxShadow: "0px 0px 10px 5px  #d6d6d6" }}
          >
            <h1 className="text-xs font-medium pl-2">
              Consult with Top Doctors Online ,24/7
            </h1>
            <button
              class="  text-white text-xs w-32  h-8 font-normal  rounded-full"
              style={{ backgroundColor: "#718857" }}
            >
              Start Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
