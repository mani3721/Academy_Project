import React, { useState } from "react";
import NavBar from "./NavBar";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../actions/AdminAction";

const AdminLogin = () => {
  const Loading = useSelector((state) => state.StudentReducer.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Admin");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(data)).then((res) => {
      if (res === "Success Login") {
        navigate("/category/dashboard");
      } else {
        setErrorMsg(res?.response?.data);
      }
    });
  };

  return (
    <div className="h-screen bg-[#b8bdc9] flex flex-col">
      <NavBar />
      <div className=" flex justify-center items-center h-screen ">
        <div className="bg-[#ffffff] justify-center rounded-2xl flex 2xl:w-[30%] xl:w-[30%] lg:w-[30%] w-[90%] ">
          <div className="  flex justify-center items-center   flex-col  p-5 w-[85%]  ">
            <div className="h-full flex flex-col gap-10 justify-center w-full rounded-2xl">
              {errorMsg && (
                <div className=" flex items-center  bg-red-200 p-3 rounded-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      class="fill-current red"
                      width="20"
                      height="20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      ></path>
                    </svg>
                  </div>
                  <div className="px-2">
                    <h1>{errorMsg}</h1>
                  </div>
                  <div></div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  className={`${
                    activeTab === "Admin"
                      ? "border-b-2 border-[#ff3366] font-poppins"
                      : "font-poppins"
                  } `}
                  onClick={() => setActiveTab("Admin")}
                >
                  Admin
                </button>
                <button
                  className={`${
                    activeTab === "Staff"
                      ? "border-b-2 border-[#ff3366] font-poppins"
                      : "font-poppins"
                  } `}
                  onClick={() => setActiveTab("Staff")}
                >
                  Staff
                </button>
              </div>
              <h1 className="text-[30px] font-poppins font-medium ">
                {activeTab} Login
              </h1>
              <label htmlFor="" className="font-poppins">
                Email
              </label>
              <input
                type="email"
                name="email"
                id=""
                className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                placeholder="manikandan.p@alphabsolutions.com"
                value={data.email}
                onChange={handleChange}
              />
              <label htmlFor="Password" className="font-poppins">
                Password
              </label>
              <input
                type="password"
                name="password"
                id=""
                className={` ${
                  errorMsg === "Wrong Password"
                    ? "border-red-400 outline-none placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2"
                    : "border-gray-200 placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 outline-none"
                }  `}
                placeholder="min 8 chars"
                value={data.password}
                onChange={handleChange}
              />

              <button
                onClick={handleSubmit}
                className="bg-[#7c2dde] py-4 flex items-center justify-center gap-2 text-white rounded-2xl font-poppins "
              >
                {Loading && (
                  <div
                    class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                )}
                {Loading ? "" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
