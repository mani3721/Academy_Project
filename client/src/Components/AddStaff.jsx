import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../Container/Framermotion";
import { useDispatch, useSelector } from "react-redux";
import { StudentData, updatestudent } from "../actions/StudentAction";
import { getAllStudentData, getOneStudent, updateStudentData } from "../api/StudentRequest";
import { addStaff, updateStaff } from "../actions/StaffAction";
import { fetchStaff } from "../api/StaffRequest";

const AddStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.StudentReducer.loading);

  console.log(Loading);

  const params = useParams();

  console.log(params.id,"iddddddddddddddd");

  const [data, setData] = useState({
    name:"",
    role:"",
    email:"",
    phone:"",
    location:""
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [axioserror, setAxiosErrorMsg]=useState()
  const [profile, setProfile]=useState('')
  const handlechange = (e) => {
     
  setData({ ...data, [e.target.name]: e.target.value, profile})
     
  
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   
  if (params.id=='add') {
    dispatch(addStaff(data)).then((res)=>{
      setAxiosErrorMsg(res)
        res._id ? navigate('/category/staff') : navigate('/addstaff/add')
         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        
     })
  }else{
    dispatch(updateStaff(params.id, data)).then((res)=>{
       console.log(res);
       res._id ? navigate('/category/staff') : navigate('/addstaff/add')
       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
     })
  }
    

};

useEffect(()=>{
 const fetchStaffData=async ()=>{
  if (params.id=="add" ) {
    
  }else{
    const {data}= await fetchStaff(params.id)

    setData(data)
 
    console.log(data,"data");
  }
   
 }
  
fetchStaffData()

},[params.id])


  return (
    <AnimatedPage>
      <div className=" flex justify-center h-screen items-center">
        <div className=" w-[50%] h-[80vh]">
          <div className="flex flex-col justify-between gap-5">
            {
              axioserror && (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">{axioserror.name}!</strong>
  <span class="block sm:inline px-2">{axioserror.message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=> setAxiosErrorMsg("")}>
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>
              )
            }
            {errorMsg && (
              <div
                class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                role="alert"
              >
                <div class="flex">
                  <div class="py-1">
                    <svg
                      class="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div className="flex justify-between w-[100%] items-center">
                    <p class="font-bold">
                      Please fill out all the required fields
                      
                    </p>
                    <span class="flex" onClick={()=> setErrorMsg(false)}>
          <svg class="fill-current h-6 w-6 text-teal-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
               </span>
                  </div>
                  
                </div>
              </div>
            )}
            <h1 className="text-[30px] font-poppins">Add Staff Details</h1>
            <label htmlFor="" className="font-poppins ">
              PROFILE
            </label>
            <input
              type="file"
              placeholder=""
              className="block w-full text-gray-800 text-sm border-2 rounded-md 
              
              file:px-5 file:py-3 file:text-sm file:border-0

              file:rounded-l-md file:font-semibold file:text-white file:bg-gray-700"
              onChange={(e)=>setProfile({profile:URL.createObjectURL(e.target.files[0])})}
              required
           
            />
            <label htmlFor="" className="font-poppins ">
              NAME
            </label>
            <input
              type="text"
              placeholder="manikandan p"
              className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
              onChange={handlechange}
              name="name"
              required
              value={data.name}
            />
            
            <label htmlFor="" className="font-poppins">
              POSITION
            </label>
            <input
              type="text"
              placeholder="Web Developer"
              className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
              onChange={handlechange}
              name="role"
              value={data.role}
              required
            />
            <label htmlFor="" className="font-poppins">
              CONTACT NO
            </label>
            <input
              type="text"
              placeholder="80662121513"
              className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
              onChange={handlechange}
              name="phone"
              value={data.phone}
              required
            />
            <label htmlFor="" className="font-poppins">
              EMAIL ID
            </label>
            <input
              type="text"
              placeholder="Abs@gmail.com"
              className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
              onChange={handlechange}
              name="email"
              value={data.email}
              required
            />
            
             <label htmlFor="" className="font-poppins ">
              Location
            </label>
            <input
              type="text"
              placeholder="Gobi sir"
              className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
              onChange={handlechange}
              name="location"
              required
              value={data.location}
            />
         
          </div>

          <div className=" flex justify-between py-10 text-white ">
            <Link to="/category/staff">
              <button className="bg-[#163b91] hover:bg-blue-800 transition-all ease-out rounded-lg px-4 py-3 text-[14px] font-medium font-poppins ">
                Back
              </button>
            </Link>
            <button
              onClick={handleSubmit}
              className="bg-[#3c37ff] p-3 flex items-center justify-center gap-2 text-white rounded-lg font-poppins "
            >
              {Loading && (
                <div
                  class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              )}
              {Loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
export default AddStaff;
