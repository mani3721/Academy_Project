import React, { useState } from "react";
import NavBar from "./NavBar";
import Login from "./StudentLogin";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/AuthAction";

const StudentSignIn=()=>{
  const Loading = useSelector((state) => state.StudentReducer.loading);

  const navigate=useNavigate()
    
   const dispatch=useDispatch()
    const [data, setData]=useState({
      name:"",
      email:"",
      password:""
    })


    const handleChange=(e)=>{

    setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      data.name&& data.email&& data.email && dispatch(signUp(data)).then((res)=>{
      
           navigate('/category/studentlist')
         
       })
         
      

    }


    return(
      <div>
        <div>
            <NavBar/>
        </div>
        <div className="bg-[#b8bdc9] flex justify-center items-center h-screen  ">
        <div className="bg-[#ffffff] justify-center rounded-2xl flex w-[30%] h-[80vh] ">

        <div className="  flex justify-center items-center   flex-col  p-5 w-[80%]  ">
            <div className="h-full flex flex-col gap-5 justify-center w-full rounded-2xl">
              {/* <div className="bg-red-100 w-full p-5 rounded-lg">

              </div> */}
              <h1 className="text-[30px] font-poppins font-semibold  ">Create Account</h1>
              <label htmlFor="" className="font-poppins">
                Student Name
              </label>
              <input
                type="text"
             
                id=""
                className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                placeholder="manikandan.p"
                onChange={handleChange}
                name="name"
                value={data.name}
                required
              />
              <label htmlFor="" className="font-poppins">
                Email
              </label>
              <input
                type="email"
              
                id=""
                className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                placeholder="manikandan.p@alphabsolutions.com"
                onChange={handleChange}
                name="email"
                value={data.email}
                required
              />
              <label htmlFor="Password" className="font-poppins">
                Password
              </label>
              <input
                type="password"
            
                id=""
                className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                placeholder="min 8 chars"
                onChange={handleChange}
                name="password"
                value={data.password}
                required
              />
            
             {/* temp */}
  
              <button onClick={handleSubmit} className="bg-[#18181c] py-4 flex items-center justify-center gap-2 text-white rounded-2xl font-poppins ">
                {
                    Loading  && <div
                    class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                  </div>
                }
                {
                    Loading ? "Loading..." :"Create Account"
                }
              </button>
            </div>
          
          </div>
        </div>
        </div>
      </div>
    )
}

export default StudentSignIn