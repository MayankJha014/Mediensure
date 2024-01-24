import React from "react";

const Newdemo33 = ({ data,imgLink }) => {
  return (
    <>
      <div className=" w-full  flex flex-col px-20 py-12  max-md:h-fit max-md:p-0">
        {data?.map((dets, index) => (
          <div
            className="h- w-full py-8 px-10 flex gap-2  rounded-xl mt-10 relative"
            style={{ backgroundColor: "#eaeaea" }}
            key={index}
          >
            <div className="h-fit w-[30%] shrink-0 ">
              <img
                src={`${imgLink}/${dets?.img?.filename}/${dets?.img?.mimetype}`}
                alt=""
              />
            </div>

            <div className="h-fit w-fit">
              <div className="h-fit w-[56vw] flex">
                <div className="h-48 w-1/2  px-6">
                  <h1 className="text-2xl font-semibold">Inclusions:</h1>
                  <div className="h-40 w-full flex  flex-col items-start justify-start  py-5 gap-3 ">
                    {dets?.points?.map((i, ind) => (
                      <div className="h-fit w-fit flex " key={ind}>
                        <img className="h-4" src="/tick.png" alt="" />
                        <h1 className="text-xs">{i}</h1>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-48 w-1/2  flex flex-col gap-1 px-9 py-24">
                  <h1 className="text-4xl font-bold">Rs {dets?.price}/-</h1>
                  <h2 className="font-bold">*Plus Taxes</h2>
                </div>
              </div>
              <button
                class=" text-white font-bold py-2 px-36 ml-28 rounded-2xl mt-2"
                style={{ backgroundColor: "#567237" }}
              >
                Buy Now
              </button>
            </div>
      
          </div>
        ))}
      </div>
    </>
  );
};

export default Newdemo33;
