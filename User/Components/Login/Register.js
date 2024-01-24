import { registerUser } from "@/store/Action/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const submiForm = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData();
    console.log(target.password.value, target.confirm.value, 789);

    if (target.password.value === target.confirm.value) {
      console.log("Passwords match!", 789);
    } else {
      toast.error("Passwords do not match ");
      return;
    }
    formData.append("name", target.name.value);
    formData.append("email", target.email.value);
    formData.append("phone", target.phone.value);
    formData.append("password", target.password.value);
    dispatch(registerUser(formData));
  };

  return (
    <>
      <div className="h-[80vh] h- flex   w-full bg-white">
        <div className="h-full  items-center justify-center w-1/2  ">
          <img className="h-full w-full object-contain" src="/img.png" alt="" />
        </div>
        <div className="h-full  w-1/2 flex items-center justify-center  ">
          <div className="h-[72vh] w-96 bg-white rounded-lg  relative flex flex-col gap-4 py-2 shadow-2xl">
            <form
              onSubmit={submiForm}
              className="h-full w-full bg-white rounded-lg  relative flex flex-col gap-4 py-2 shadow-2xl"
            >
              <div className=" w-full flex flex-col justify-center gap-1 h-10 mt-4 pl-3 ">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  className="input input-bordered border-2 w-full max-w-xs px-2 py-1"
                />
              </div>

              <div className=" w-full flex flex-col justify-center gap-1 h-10 mt-4 pl-3 ">
                <label className="label">
                  <span className="label-text"> Mobile Number</span>
                </label>
                <input
                  type="Number"
                  placeholder=""
                  className="input input-bordered border-2 w-full max-w-xs px-2 py-1"
                  name="phone"
                />
              </div>

              <div className=" w-full flex flex-col justify-center gap-1 h-10 mt-4 pl-3 ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered border-2 w-full max-w-xs px-2 py-1"
                  name="email"
                />
              </div>

              <div className=" w-full flex flex-col justify-center gap-1 h-10 mt-4 pl-3 ">
                <label className="label">
                  <span className="label-text">Create Password</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered border-2 w-full max-w-xs px-2 py-1"
                  name="password"
                />
              </div>

              <div className=" w-full flex flex-col justify-center gap-1 h-10 mt-4 pl-3 ">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered border-2 w-full max-w-xs px-2 py-1"
                  name="confirm"
                />
              </div>

              <div className="form-control pl-5 pt-5 flex ">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    checked="checked"
                    className="checkbox"
                  />
                  <span className="label-text pl-3 font-light  text-[#567237] items-center">
                    Receive relevant offers and promotional communication from
                    MediEnsure
                  </span>
                </label>
              </div>
              <button
                type="submit"
                class="bg-[#567237] mx-4 mt-1 w-[80%]  text-white font-bold py-2 rounded-md"
              >
                Sent OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
