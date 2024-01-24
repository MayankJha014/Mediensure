import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
const Last3 = ({ data }) => {
  return (
    <>
      <div className="h-fit w-full flex flex-col py-8">
        <div className="h-fit w-full ">
          <div className="h-fit w-fit flex items-center justify-center gap-14 px-28 py-4 ">
            <h1 className="text-3xl font-normal" style={{ color: "#567237" }}>
              Description
            </h1>
            {/* <div className='w-10 absolute  top-10 left-8'style={{color:"#567237",height:"12px"}}></div> */}

            <h1 className="text-3xl font-normal">Details</h1>
            <h1 className="text-3xl font-normal">Reviews</h1>
          </div>

          <div className="h-fit w-full flex flex-col items-start  gap-1 px-28 py-5 ">
            {data?.description?.map((dets, index) => (
              <h1 className="font-medium text-sm" key={index}>
                <RemoveIcon /> {dets}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Last3;
