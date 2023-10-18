import React, { useEffect, useState } from "react";
import AnimatedPage from "../Container/Framermotion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiMegaphone } from "react-icons/hi2";
import { RiDraftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addcource, editcource } from "../actions/CourceAction";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import check from '../assest/check.png'
import { getidbydata } from "../api/CourceRequest";
const AddCources = () => {
  const [value, setValue] = useState('');

 const params= useParams()


  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.StudentReducer.loading);
  // const[Loading, setLoading]=useState(true)
  const [data, setData] = useState({
    image: "",
    title: "",
    category: "",
    date: "",
    discription: "",
    status:"All",
  });
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [fileUpload, setFileUpload]=useState(false)
  const [images, setImage] = useState();
  const [id, setId]=useState()
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let currentDate = `${day} ${month} ${year}`;



  const convertBase64=(e)=>{

   const reader=new FileReader();

   reader.readAsDataURL(e.target.files[0])
   reader.onload=()=>{
    console.log(reader.result);
    setData({...data, image:reader.result})
    setFileUpload(true)
   }
   reader.onerror=error=>{
    console.log(error,"Error");
   }
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    
  };

 useEffect(()=>{
  if (params.id=="add") {
    
  }else{ 
    const fetchdata=async ()=>{
 
    const {data}= await getidbydata(params.id)

   
    let date = new Date(data.date);
    let day = date.getDate();
    let month = String(date.getMonth() + 1).padStart(2,'0')
    let year = date.getFullYear();
    // 2023-08-11
    let currentDate = `${year}-${month}-${day}`;

    setData({...data, date:currentDate})
    

 }

 fetchdata()

}
 


},[params.id])
  
  const handleSubmit = (e,id) => {
    setId(id)
   
    e.preventDefault();
    
    if (params.id=='add') {
      if (data.title && data.category && data.date ) {
        dispatch(addcource({...data, activeTap:id})).then((res) => {
      
          res._id ? navigate("/category/cources") : setError(res);
        });
      } else {
        setErrorMsg(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }else{
      if (data.title && data.category && data.date ) {
      dispatch(editcource(params.id, data)).then((res)=>{
    
        res._id && navigate('/category/cources')
       })
      }
    }

     
    
    
  };

  

  return (
    <>
      <AnimatedPage>
        <div className="bg-[#f2f2f4] flex justify-center w-screen h-screen items-center">
          <div className="bg-white rounded-xl shadow-lg flex-col gap-10 flex justify-center items-center w-[80%] h-[90vh]">
            <div className="flex justify-between w-[80%] p-5">
              <div className="flex flex-col gap-4 w-[40%]">
                {error && (
                  <div
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong class="font-bold">{error.name}!</strong>
                    <span class="block sm:inline px-2">{error.message}</span>
                    <span
                      class="absolute top-0 bottom-0 right-0 px-4 py-3"
                      onClick={() => setError("")}
                    >
                      <svg
                        class="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                )}
                {errorMsg && (
                  <div
                    class="bg-teal-100 border-t-4 rounded-lg border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
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
                        <p class="font-bold font-roboto">
                          Please fill out all the required fields
                        </p>
                        <span class="flex" onClick={() => setErrorMsg(false)}>
                          <svg
                            class="fill-current h-6 w-6 text-teal-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <h1 className="font-poppins text-[40px]">Add New Cource</h1>

                <label htmlFor="" className="font-poppins">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Full Stack Development"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                />

                <label htmlFor="" className="font-poppins">
                  Category
                </label>
                <select
                  required
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                >
                  <option
                    value=""
                    selected
                    disabled
                    hidden
                    className="text-slate-300"
                  >
                    Choose Courses
                  </option>
                  <option value="Full Stack Development">
                    Full Stack Developer
                  </option>
                  <option value="Front End Development">
                    Front End Developer
                  </option>
                  <option value="Back End Development">Back End Developer</option>
                  <option value="UI/UX Designer">UI/UX</option>
                </select>

                <label htmlFor="" className="font-poppins">
                  Date
                </label>
                <input
                  name="date"
                  value={data.date}
                  onChange={handleChange}
                  type="date"
                  className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                />
              </div>

              <div className="py-5 w-[50%]">
                <label htmlFor="" className="font-poppins">
                  Image
                </label>
                <div class="flex py-3 items-center justify-center">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-55 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  > 
                    
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    {
                     fileUpload? <div className="flex flex-col items-center justify-center "><img src={check} alt=""  width={40}/> <h1 className="text-green-500">Image Uploaded Successfully </h1> </div> 

                       : <> <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p></>

                   }
                  </div>
                  
                    
                    <input
                      id="dropzone-file"
                      accept="image/*"
                      onChange={convertBase64}
                      type="file"
                      class="hidden"
                    />
                  </label>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className="font-poppins">
                    Content
                  </label>
                  <div className="h-[25vh] overflow-auto w-full text-sm text-gray-900 bg-gray-50 rounded-lg   focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <ReactQuill theme="snow" className="h-full"/>
                  </div>
                 
                  {/* <textarea
                    name="discription"
                    value={data.discription}
                    onChange={handleChange}
                    rows="7"
                    className=" p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea> */}
                </div>
              </div>
            </div>
            {params.id=='add' ?  <div className="flex justify-between p-3 w-[80%] items-center gap-4">
              <div
                onClick={() => navigate("/category/cources")}
                className=" text-[20px] border-gray-400 border-2 rounded-full text-black p-2 "
              >
                <button className="px-4 font-poppins">Cancel</button>
              </div>
              <div className="flex gap-5 text-[20px] items-center">
                <div  onClick={(e)=>handleSubmit(e,"draft")} className="flex cursor-pointer items-center gap-2 text-red-500 p-2 border-2 border-red-400 font-roboto rounded-full px-10">
               <RiDraftLine />
                  { id == 'draft' && Loading && (
                <div
                  class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              )} {id == 'draft' && Loading? "Loading..": 'Draft' }
                </div>
                <div
                  onClick={(e)=>handleSubmit(e,"publish")}
                  className="flex items-center cursor-pointer gap-2 bg-[#2081e2] p-2 font-roboto text-white rounded-full px-10 "
                >
                 <HiMegaphone />
                  { id == 'publish' && Loading && (
                <div
                  class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              )}
                 {id == 'publish' && Loading ? "Published":  'Publish'}
                </div>
              </div>
            </div>: <div className="flex justify-between p-3 w-[80%] items-center "> 
            <button   onClick={() => navigate("/category/cources")} className="text-[20px] border-2 border-gray-400 text-black p-2.5 rounded-full px-10" >Cancel</button>
             <button className="bg-[#2081e2] p-3 font-roboto text-white rounded-full px-20" onClick={handleSubmit}>{Loading? 'Loading..' :"Save"}</button></div> }
           
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default AddCources;
