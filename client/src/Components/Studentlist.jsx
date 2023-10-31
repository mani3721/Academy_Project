import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AnimatedPage from "../Container/Framermotion";
import { deleteStudentData, getAllStudentData } from "../api/StudentRequest";
import SideBar from "./sideBar";
import { categories } from "../utils/data";

const StudentDetails = () => {
  const navigate = useNavigate();
  const pathname= useLocation()

  const [studentData, setStudentData] = useState([]);

  const [selectCategory, setSelectCategory] = useState("");
  const [search, setSearch] = useState("");

  const [successmsg, setSuccessmsg] = useState("");

  const [Loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetcAllStudentData = async () => {
      const { data } = await getAllStudentData();



      const result = data.filter((student) => {
        return student.name.toLowerCase().includes(search);
      });

      setStudentData(result);
    };

    fetcAllStudentData();
  }, [search, successmsg]);

  const handledelete = async (id) => {
    setId(id);
    setLoading(true);

    // setSuccessmsg(true)

    await deleteStudentData(id).then((res) => {
      setSuccessmsg(res);
      setLoading(false);
    });
  };

  return (
    <AnimatedPage>
      <div className="h-screen">
        <div>
          <NavBar />
        </div>
        <div className="absolute mt-[70px]">
          <SideBar hidden={"hidden"} />
        </div>
        <div className=" scroll-smooth  overflow-auto scrollBar ">
          <div className="flex justify-center">
            <div className="flex justify-between items-center w-[97%] p-6">
              <div className="flex w-[50%]">
                <select
                  name=""
                  id=""
                  onChange={(e) => setSelectCategory(e.target.value)}
                  className="bg-[#e5e7eb] px-3 text-center font-poppins border-l-2 outline-none rounded-l-lg text-sm"
                >
                  <option value="allcategories">All categories</option>
                  <option value="Student ID">Student ID</option>
                  <option value="Student Name">Student Name</option>
                  <option value="Staff Name">Staff</option>
                </select>
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  className=" outline-none block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50  border-l-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder={`Type ${
                    selectCategory ? selectCategory : "All Categories"
                  }...`}
                  required
                />
                <div class=" p-3 text-sm font-medium cursor-pointer h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg
                    class="w-4 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span class="sr-only">Search</span>
                </div>
              </div>
              <div className="flex justify-end gap-5">
                <div>
                  <Link to="/createstudentid">
                    <button className="bg-[#1e40af] text-white p-3 rounded-lg font-poppins text-sm">
                      Create Student ID
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to={`/studentlist/addstudentdetails/${"Add"}`}>
                    <button className="bg-[#1e40af] text-white p-3 rounded-lg font-poppins text-sm">
                      Add Student Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="   w-full scroll-smooth ">
            <div class="overflow-x-auto no-scrollbar overflow-auto">
              <div class="flex items-center  justify-center bg-gray-100 font-sans overflow-hidden">
                <div class="w-[90rem] h-[63vh]  overflow-auto">
                  <div class="bg-white shadow-md rounded my-6">
                    <table class="min-w-max w-full table-auto  ">
                      <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th class="py-3 px-6 text-left">S.NO</th>
                          <th class="py-3 px-6 text-left">Student ID</th>
                          <th class="py-3 px-6 text-left">Name</th>
                          <th class="py-3 px-6 text-center">College</th>
                          <th class="py-3 px-6 text-center">Department</th>
                          <th class="py-3 px-6 text-center">Contact NO</th>
                          <th class="py-3 px-6 text-left">Email Id</th>
                          <th class="py-3 px-6 text-center">Course</th>
                          <th class="py-3 px-6 text-center">Staff</th>
                          <th class="py-3 px-6 text-center">Join Date</th>
                          <th class="py-3 px-6 text-center">
                            <AiTwotoneEdit />
                          </th>
                          <th class="py-3 px-6 text-center">
                            <AiFillDelete />
                          </th>
                        </tr>
                      </thead>

                      <tbody class="text-gray-600 text-sm font-light overflow-scroll  w-full">
                        {!studentData.length && (
                          <td
                            className="bg-teal-100 text-center font-poppins p-3 text-gray-500"
                            colSpan={15}
                          >
                            No student data available. Please add student
                            details to the table. Thank you.
                          </td>
                        )}
                        {studentData
                          .slice(0, studentData?.length)
                          .reverse()
                          .map(( student, i) => {
                            return (
                              <tr class="even:bg-gray-50 odd:bg-white border-b overflow-scroll  border-gray-200 hover:bg-gray-100">
                                <td class="py-3 px-6 text-left font-poppins text-sm whitespace-nowrap">
                                  <div class="flex items-center">
                                    <div class="mr-2">{i + 1}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.studentid}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.name}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.college}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.dept}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.contactno}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.email}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.course}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.staff}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm">
                                  <div class="flex items-center">
                                    <div class="mr-2">{student.date}</div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm cursor-pointer">
                                  <div class="flex items-center">
                                    <div class="mr-2">
                                      <AiTwotoneEdit
                                        onClick={() =>
                                          navigate(
                                            `/studentlist/addstudentdetails/${student._id}`
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap font-poppins text-sm cursor-pointer">
                                  <div class="flex items-center">
                                    <div class="mr-2">
                                      {id === student._id && Loading ? (
                                        <div
                                          class="inline-block  h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                          role="status"
                                        ></div>
                                      ) : (
                                        <AiFillDelete
                                          onClick={() =>
                                            handledelete(student._id)
                                          }
                                        />
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center ">
          <div className="flex justify-center items-center py-4 ">
          {categories.map((category) => {
              const isActive = pathname.pathname.includes(`/category/${category.key}`);
              return (
                <Link
                  to={`/category/${category.key}`}
                  key={category.key}
                  className={`rounded-lg p-3 ${
                    isActive && "bg-[#3b5be9] text-white"
                  } `}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div>{category.image}</div>

                    <div>
                      <p className="text-light-1 font-roboto max-lg:hidden">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {/* <div className="">
            <button>Logout</button>
          </div> */}
          </div>
        
        </div>
      </div>
    </AnimatedPage>
  );
};

export default StudentDetails;
