import { uploadDentalReview } from "@/store/Action/Authentication";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const AddReviewEqui = ({ setreview }) => {
    const dispatch = useDispatch()
    const formSubmit = (e)=>{
        e.preventDefault();
        const info = {
            description:e.target.description.value,
            by:e.target.by.value
        }
       dispatch(uploadDentalReview(info));
       setreview(false);
    }
  return (
    <div className="flex flex-col p-10">
      <i
        className="ri-arrow-left-line text-2xl cursor-pointer"
        onClick={() => setreview(false)}
      ></i>

      <form className="flex flex-col gap-4" onSubmit={formSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            placeholder="Description type here..."
            name="description"
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">By</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            name="by"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <Button variant="contained" className="bg-blue-500 w-fit" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddReviewEqui;
