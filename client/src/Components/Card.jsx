import React, { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { SiDatabricks } from "react-icons/si";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDraftLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { deleteCourses, draftCourses } from "../api/CourceRequest";
import { useNavigate } from "react-router-dom";
const Card = ({ item, handleChange, activeTab, setCall,loading }) => {
   const navigate=useNavigate()
  const [openSmallDrapdown, SetopenSmallDrapdown] = useState();
  const [openDrapDown, setopenDrapDown] = useState(false);
  const [Loading, setLoading] = useState(false||loading);
  const [isActive, setActive] = useState("");
  //   const [getCall, setCall]=useState()
  const [id, setId] = useState();
  const smallDrapdown = (id) => {
    setopenDrapDown(!openDrapDown);
    SetopenSmallDrapdown(id);
  };

  let date = new Date(item.date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;

  const handleDeleteCource = async (id) => {
    setId(id);
    setLoading(true);
    setActive("delete");
    await deleteCourses(id).then((res) => {

      setCall(res);
      setLoading(false);
    });
  };

  const handleDraft = async (id) => {
    setActive("draft");
    setLoading(true);
    await draftCourses(id).then((res) => {

      setCall(res);
      // setLoading(false);
      setopenDrapDown(false);
    });
  };

  return (
    <>
      <div class="w-full p-5 rounded-md">
        <div
          className={`flex ${
            activeTab == "draft" ? "justify-between" : "justify-end"
          }  items-center`}
        >
          <div>
            <input
              type="checkbox"
              id="a1"
              value={item._id}
              onChange={(e) => handleChange(e, item._id)}
              className={`${
                activeTab == "draft"
                  ? "block h-5 w-5 cursor-pointer "
                  : "hidden"
              }`}
            />
          </div>
          {(activeTab == "draft" || activeTab == "publish") && (
            <div onClick={() => smallDrapdown(item._id)}>
              <BsThreeDots
                fontSize={30}
                className="cursor-pointer inline-block transition delay-75   hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg  p-1.5 "
              />
            </div>
          )}
        </div>
        {(activeTab == "draft" || activeTab == "publish") && (
          <div className="relative">
            {openDrapDown && openSmallDrapdown == item._id && (
              <div className="absolute  top-3.5 font-roboto right-5 ">
                <div className="z-10 p-3 px-7   w-full flex-col  justify-center items-center text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                  {activeTab == "draft" && (
                    <div onClick={()=>navigate(`/category/addcource/${item._id}`)} className="flex justify-center  items-center py-3 gap-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                     <div className="flex items-center justify-center gap-4">
                     <AiOutlineEdit />
                      <button className=" font-roboto text-gray-700 ">
                        Edit
                      </button>
                     </div>
                    </div>
                  )}
                  {activeTab == "publish" && (
                    <div className="flex justify-center items-center py-3 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        {isActive == "draft" && Loading ? (
                        <div
                          className="flex h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                      ) :<>
                      
                      
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleDraft(item._id)}>
                    <RiDraftLine />
                      <button
                        
                        className=" font-roboto text-gray-700 "
                      >
                        Draft
                      </button>  
                    </div>
                  </>}
                    </div>
                  )}
               
                    <div className="flex justify-center gap-2 items-center py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      {isActive == "delete" && Loading ? (
                        <div
                          className="flex h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                      ) : (
                        <>
                          {" "}
                        <div  onClick={() => handleDeleteCource(item._id)} className="flex justify-between gap-2 cursor-pointer items-center">
                        <MdDeleteOutline style={{ color: "red" }} />
                          <button
                           
                            className=" font-roboto text-red-600 "
                          >
                            Delete
                          </button>
                        </div>
                        </>
                      )}
                    </div>

                    <div>
                    <button class="sharebtn relative flex z-10 bg-white hover:bg-gray-100 p-2 gap-2 focus:outline-none border-blue-400" title="click to enable menu">
         
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-4 w-5 my-1 text-blue-700">
            <path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z">
            </path>
          </svg>
          <span class="inline-block  text-gray-600">Share</span>
      </button>
                    </div>
                  
                </div>
              </div>
            )}
          </div>
        )}

        <div className="max-w-[350px] mx-auto hover:shadow-2xl transition delay-100 shadow-xl p-1 ">
          <div class="rounded-lg w-full h-[30vh] flex items-center justify-center overflow-hidden mb-8 p-2 ">
            <img
              src={item.image}
              alt="image"
              class="w-full rounded-xl object-cover"
            />
          </div>
          <div className="  px-5 py-3">
            <div className="flex gap-10 items-center justify-between">
              <span
                class="
                     bg-primary
                     rounded
                     inline-block
                     text-center
                  
                
                     leading-loose
                     font-semibold
                     text-[15px]
                     
                    
                     "
              >
                #{item.category}
              </span>
              <span
                class="
                     bg-primary
                     rounded
                     inline-block
                     text-center
                    
                     text-xs
                     leading-loose
                     font-semibold
                     text-white
                      p-2
                     bg-[#3056d3]
                     "
              >
                {currentDate}
              </span>
            </div>
            <h1
              className="bg-primary
                     rounded
                     inline-block
                     text-left
                     py-4
                     text-[18px]
                     leading-loose
                     font-semibold
                    "
            >
              {item.title}
            </h1>
            <div className="flex justify-between py-1">
              <div className="flex items-center gap-2">
                <div>
                  <SiDatabricks style={{ color: "#ff4f7c" }} />
                </div>
                <div>12 Lession</div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <AiOutlineClockCircle style={{ color: "#ff4f7c" }} />
                </div>
                <div>1 hrs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
