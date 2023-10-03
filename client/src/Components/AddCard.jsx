import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardData } from "../actions/StudentAction";
import { useNavigate } from "react-router-dom";



const AddCard=()=>{
    const Loading = useSelector((state) => state.StudentReducer.loading);
   const navigate= useNavigate()
    const dispatch= useDispatch()
    const [errorMeg, setErrorMsg]=useState(false)
    const [data, setData]=useState([{
        title:"",
        count:""
    }])

    const handleChange=(e)=>{
         setData({...data, [e.target.name]:e.target.value})
    }

const handleSubmit=(e)=>{
    e.preventDefault()
    data.title&& data.count ?  dispatch(DashboardData(data)).then((res)=>{
      if (res._id) {
          navigate('/category/dashboard')
      }else {
         
      }
    }) : setErrorMsg(true)

     
}
    return (
        <div className="flex justify-center items-center h-screen">
         <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-5 py-5">
    {errorMeg&& (
 <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2" role="alert">
 <p class="font-bold">Please fill all required fields</p>
</div>
    )}
 
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="">
        Title
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="title" 
      required
       onChange={handleChange}
       value={data.title}
      type="text" placeholder="Total Student"/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Count
      </label>
      <input  
      onChange={handleChange}
       value={data.count}
       required
       name="count"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="100"/>
    </div>
    <div class="flex items-center justify-between">
      <button onClick={()=>navigate('/category/dashboard')} className="bg-slate-800 p-3 flex items-center gap-3 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Back
      </button>
      <button onClick={handleSubmit} className="bg-blue-500 p-3 flex items-center gap-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
      {Loading && (
                <div
                  class="inline-block h-5 w-5  animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              )}
              {Loading ? "" : "Submit"}
      </button>
     
    </div>
  </form>
 
</div>
        </div>
    )
}

export default AddCard