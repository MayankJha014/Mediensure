import { loginUser } from "@/store/Action/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData();
    formData.append("email", target.email.value);
    formData.append("password", target.password.value);
    dispatch(loginUser(formData));
    router.push("/mediensure/verifyauth")
  };

  return (
    <>
      <div className="h-[80vh] h- flex   w-full bg-white">
        <div className="h-full  items-center justify-center w-1/2  ">
          <img className="h-full w-full object-contain" src="/img.png" alt="" />
        </div>
        <div className="h-full  w-1/2 flex items-center justify-center  ">
          <form onSubmit={handleSubmit}>
            <div className="h-80 w-96 bg-white rounded-lg   shadow-2xl">
              <div className=" w-full flex flex-col justify-center gap-1 h-10 mt-4 pl-3 ">
                <label className="label">
                  <span className="label-text">Mobile Number/ Email ID</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="email"
                  className="input input-bordered border-2 w-full max-w-xs px-2 py-1"
                />
              </div>

              <div className=" w-full flex flex-col justify-center gap-1 h-10 mt-7 pl-3 ">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="password"
                  className="input input-bordered border-2 w-full max-w-xs px-2 py-1"
                />
              </div>

              <h1 className="ml-3 mt-5 text-green-300">Forgot Password?</h1>

              <div className="form-control pl-4 pt-3 flex items-center ">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    checked="checked"
                    className="checkbox"
                  />
                  <span className="label-text text-base pl-3 font-light">
                    Login with OTP instead of password
                  </span>
                </label>
              </div>

              <button class="bg-[#567237]  ml-6 mt-6  text-white font-bold py-2 px-[10vw] rounded-md">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
