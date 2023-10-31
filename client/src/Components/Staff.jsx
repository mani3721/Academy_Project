import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./sideBar";
import AnimatedPage from "../Container/Framermotion";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPhoneVibrateFill } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import man from "../assest/man.png";
import { deleteStaffData, getAllStaffData } from "../api/StaffRequest";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {HiMiniCheckBadge} from 'react-icons/hi2'

const Staff = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [Loading, setLoading] = useState(false);
  const [getCall, setGetCall] = useState("");
  const [id, setId] = useState();
  useEffect(() => {
    const getAllStaff = async () => {
      const { data } = await getAllStaffData();
    console.log(data);
      const result = data.filter((staff) => {
        return staff.name.toLowerCase().includes(search);
      });

      setData(result);
    };

    getAllStaff();
  }, [search, getCall]);

  const handleClick = () => {
    window.print();
  };

  const handleDelete = async (id) => {
    setId(id);
    setLoading(true);
    await deleteStaffData(id).then((res) => {
    
      setGetCall(res);
    });
  };

  return (
    <>
      <AnimatedPage>
        <div>
          <div>
            <NavBar />
          </div>

          <div className="flex ">
            <div className="py-8">
              <SideBar />
            </div>
            <div className=" px-11 py-5 w-screen ">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-[#507e7b] text-[20px] font-poppins">
                    {data?.length} Staffs
                  </h1>
                </div>

                <div className="flex items-center p-3 w-[40rem]  bg-[#f7f7ff] rounded-2xl">
                  <FiSearch color="#989fb9" fontSize={20} />
                  <input
                    type="text"
                    className="bg-transparent outline-none w-[100%] px-2 placeholder:font-poppins"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  />
                </div>
                <div className="flex gap-5">
                  <div>
                    <AiOutlinePrinter
                      fontSize={25}
                      onClick={handleClick}
                      className="cursor-pointer"
                    />
                  </div>
                  <div>
                    <BsFillCloudDownloadFill
                      fontSize={25}
                      className="cursor-pointer "
                    />
                  </div>
                </div>

                <div
                  onClick={() => navigate("/addstaff/add")}
                  className="flex items-center border-2 cursor-pointer rounded-md border-[#3a6c69] py-3 px-5"
                >
                  <AiOutlinePlus />
                  <button className="font-poppins text-[#507e7b]">
                    Add Staff
                  </button>
                </div>
              </div>
              <div className="flex mt-2 flex-wrap over h-[75vh] overflow-auto justify-start  gap-8 ">
                {!data.length && (
                  <div className=" w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center">
                      <h1 className="font-bold text-[20px]">
                        No result for "{search}"{" "}
                      </h1>
                      <p>
                        Try refining your search terms or try a different query.
                      </p>
                    </div>
                  </div>
                )}
                {data.map((staff) => (
                  <div class="max-w-xs group">
                    <div class="bg-white hover:shadow-2xl transition delay-50 shadow-xl rounded-lg p-4 py-3">
                      <div className="flex items-center justify-between">
                        <span title="Present" class="relative flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>

                        {id === staff._id && Loading ? (
                          <div
                            class="inline-block  h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                          ></div>
                        ) : (
                         <div className="">
                           <AiOutlineClose
                         className="cursor-pointer "
                         onClick={() => handleDelete(staff._id)}
                       /> </div>
                        )}
                      </div>
                      <div className="flex justify-center">
                        <div class="photo-wrapper p-2">
                          <img
                            class="w-10 h-10 rounded-full mx-auto"
                            src={staff.profile?.profile? staff.profile?.profile : man}
                            alt="John Doe"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                              {staff.name.split(/\s+/)[0]}
                            </h3>
                            <HiMiniCheckBadge color="blue"/>
                          </div>
                          <div class="text-center text-gray-400 text-xs font-semibold">
                            <p>{staff.role}</p>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div class="p-2">
                        <table class="text-xs my-3">
                          <tbody>
                            <tr>
                              <td class="px-2 py-2 text-gray-500 font-semibold">
                                <AiOutlineMail />
                              </td>
                              <td class="px-2 py-2">{staff.email}</td>
                            </tr>
                            <tr>
                              <td class="px-2 py-2 text-gray-500 font-semibold">
                                <BsFillPhoneVibrateFill />
                              </td>
                              <td class="px-2 py-2">{staff.phone}</td>
                            </tr>
                            <tr>
                              <td class="px-2 py-2 text-gray-500 font-semibold">
                                <GrLocation />
                              </td>
                              <td class="px-2 py-2">{staff.location}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div
                          class="text-center my-3"
                          onClick={() => navigate(`/addstaff/${staff._id}`)}
                        >
                          <h1 className="text-xs hover:underline text-indigo-500 italic cursor-pointer font-medium">
                            Edit Profile
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Staff;
