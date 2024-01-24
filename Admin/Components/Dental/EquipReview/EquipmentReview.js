import { Button } from "@mui/material";
import React from "react";

const EquipmentReview = ({setopen,equipmentdets,imgLink}) => {
  return (
    <>
      <div className="w-full p-10 flex flex-col gap-4">
        <Button
          variant="contained"
          className="bg-blue-500 w-fit"
          onClick={() => setopen(true)}
        >
          Add Banner
        </Button>
        <div className="w-full h-[50vh] ">
            <img className="w-full h-full object-contain" src={`${imgLink}/${equipmentdets?.equipmentBanner?.filename}/${equipmentdets?.equipmentBanner?.mimetype}`} alt="" />
        </div>
      </div>
    </>
  );
};

export default EquipmentReview;
