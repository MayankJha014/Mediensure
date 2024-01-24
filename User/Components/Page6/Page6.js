import React from "react";

const Page6 = ({ data, imgLink }) => {
  return (
    <>
      <div className="h-96 w-full  items-center justify-center flex flex-col gap-5 max-md:hidden">
        <h1 className="text-2xl font-medium" style={{ color: "#3f7106" }}>
          What our Users said about us{" "}
        </h1>
        <div className="h-60 w-full flex pt-5 pl-18  gap-8 justify-center item-center">
          {data?.map((dets, index) => (
            <div
              className="h-full w-72 rounded-bl-2xl relative gap-5 flex flex-col pt-4 px-6 items-start rounded-tr-2xl  "
              style={{ backgroundColor: "#8da473" }}
              key={index}
            >
              <p className="text-white text-sm">{dets?.text}</p>
              <div className="h-16 w-16 rounded-full absolute top-44 left-28 object-contain  bg-black">
                <img
                  src={`${imgLink}/${dets?.filename}/${dets?.mimetype}`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page6;
