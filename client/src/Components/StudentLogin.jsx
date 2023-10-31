import React, { useState } from "react";
import AnimatedPage from "../Container/Framermotion";
import { useDispatch, useSelector } from "react-redux";
import { logIn} from "../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const Loading = useSelector((state) => state.StudentReducer.loading);



  const dispatch= useDispatch()
  const navigate=useNavigate()

  const [data, setData]=useState({
    email:"",
    password:"" 
  })

  const [errorMsg, setErrorMsg]=useState('')

  const handleChange=(e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    
     e.preventDefault()
       
     dispatch(logIn(data)).then((res)=>{
   
        res==="Success Login"? navigate("/studentpage") : setErrorMsg(res.response.data)
  
     })
     


  }
  return (
    <>
    <AnimatedPage>
    <div className="bg-[#b8bdc9] flex justify-center items-center h-[100vh]  ">
       
       <div className="bg-[#ffffff] justify-center rounded-2xl flex w-[80%] h-[80vh] ">
         <div className=" h-[80vh] hidden md:flex md:flex-col  w-[50%] p-5  ">
           <div className="bg-[#f3f5f9] h-full  rounded-2xl"></div>
         </div>
         <div className=" h-[80vh] flex justify-center items-center   flex-col w-[100%] md:w-[50%] p-5  ">
         {
          errorMsg && (
            <div className=" flex justify-start items-center w-full rounded-lg bg-red-100 p-3">
            <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-5 w-5">
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
          clip-rule="evenodd" />
      </svg>
     <div className="px-3">
     <h1 className="font-poppins"> {errorMsg}</h1>
     </div>
            </div>
          )
         }
           <div className="h-full flex flex-col gap-10 justify-center w-[80%]  rounded-2xl">
             <h1 className="text-[30px] font-poppins font-medium ">
               Student login
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
               required
             />
             <label htmlFor="Password" className="font-poppins">
               Password
             </label>
             <input
               type="password"
               name="password"
               id=""
               className={`${errorMsg==="Wrong Password" ? "placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-red-400 outline-none":"placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none" } `}
               placeholder="min 8 chars"
               value={data.password}
               onChange={handleChange}
               required
             />

             <button onClick={handleSubmit} className="bg-[#3c37ff] py-4 flex items-center justify-center gap-2 text-white rounded-2xl font-poppins ">
               {Loading && (
                 <div
                   class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                   role="status"
                 ></div>
               )}
               {Loading ? "Loading..." : "Login"}
             </button>
           </div>
           <div>
             <h1 className="text-[12px] text-center font-poppins text-gray-500">
               © 2017-2023{" "}
               <a
                 href="https://www.talentoacademy.in/"
                 className="text-blue-700 font-semibold"
               >
                 Talento Academy
               </a>{" "}
               All right reserved by{" "}
               <a
                 href="https://alphabsolutions.com/"
                 className="text-blue-700 font-semibold"
               >
                 ABS
               </a>
             </h1>
           </div>
         </div>
       </div>
     </div>
    </AnimatedPage>
      
    </>
  );
};

export default StudentLogin;
