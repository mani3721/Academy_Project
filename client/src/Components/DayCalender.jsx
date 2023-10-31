import React, { useEffect, useState } from "react";
import {
  AiOutlineClockCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { BsCalendarDate } from "react-icons/bs";
import rooms from "../assest/daymeeting.png";
import { PiStudentFill } from "react-icons/pi";
import { deletebatch, fetchAllBatch } from "../api/addbatchRequest";
import { useNavigate } from "react-router-dom";
import DayTimelineDemo from "./DayTimelineDemo";
import class1 from '../assest/class1.png'
import DayTimeline from "./DayTimeline";
const DayCalender = ({ currentDate, setGetCall }) => {
  const navigate = useNavigate();
  const [opensidebar, setSidebar] = useState(false);
  const [openstudents, setStudents] = useState(false);
  const [openlist, setOpenList] = useState(false);
  const [events, setEvents] = useState([
    // {
    //   _id: "650bdfa3f56c32aab254663a",
    //   batchname: "Morning Batch",
    //   room: "Talento",
    //   start_date: "2023-10-10T00:00:00.000Z",
    //   end_date: "2023-10-20T00:00:00.000Z",
    //   start_time: "10:40",
    //   end_time: "11:00",
    //   students: [
    //     {
    //       value: "64e312e7396821be99070e16",
    //       label: "pavithra",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     ,
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     },
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     }
    //     ,
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     }
    //     ,
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     }
    //     ,
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     }
    //     ,
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     }
    //     ,
    //     {
    //       value: "64d5d567bc578012d768cd3d",
    //       label: "Manikandan PDD",
    //     }
    //   ],
    //   coursename: "Full Stack Developer",
    //   batchtype: "Workday",
    //   staffname: "GOBI",
    //   remarks: "Hi Guys ",
    //   status: "",
    //   dates: [
    //     "2023-10-10",
    //     "2023-10-11",
    //     "2023-10-12",
    //     "2023-10-13",
    //     "2023-10-14",
    //     "2023-10-15",
    //     "2023-10-16",
    //     "2023-10-17",
    //     "2023-10-18",
    //     "2023-10-19",
    //     "2023-10-20",
    //   ],
    // }
    // { id: 1, title: 'Meeting 1', date: '2023-09-06',rooms:"Talento", startTime: '09:50', endTime: '10:00' },
    // { id: 2, title: 'Lunch', date: '2023-09-06', startTime: '12:00', endTime: '13:00' },
    // { id: 3, title: 'Meeting 2', date: '2023-09-07', startTime: '15:00', endTime: '16:00' },
  ]);

  const [getCall, setGetCalls] = useState("");

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdatas = async () => {
      const { data } = await fetchAllBatch();

      setEvents(data);
    };
    fetchdatas();
  }, [getCall]);

  const [sideEvents, setSideEvents] = useState([]);
  const [eventList, setEventList] = useState([]);

  const setOpenSidebar = (value, obj) => {
    setSidebar(value);
    setSideEvents(obj);
    setEventList([...obj]);
  };
  const displaydate = (dates) => {
    let newDate = new Date(dates);

    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();

    return `${date}-${month}-${year}`;
  };


  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  // const start = new Date(2023, 1, 1);
  // const end = new Date(2023, 5, 1);

  const handledeleteBatch = async (id) => {
    setLoading(true);

    id &&
      (await deletebatch(id).then((res) => {
        setLoading(false);
        setGetCalls(res);
        setGetCall(res);
        setSidebar(false);
      }));
  };

  return (
   <>

   <div className="px-5 flex  ">
    <div className="flex gap-1 items-center">
      <AiOutlineFieldTime fontSize={25} color="blue"/>
    <h2 className="text-[#071232] font-roboto font-bold text-[20px]">Time</h2>
    </div>
   <div className="w-full gap-40 border-2 flex justify-evenly border-blue-800">
   <div className="flex gap-2 items-center">
    <img src={class1} alt="class" width={20} height={20} className="" />
    <h2 className="text-[#071232] font-roboto text-[20px]  font-bold ">Talento</h2>

    </div>
    <div className="flex gap-2 items-center">
    <img src={class1} alt="class" width={20} height={20} className="" />
    <h2 className="text-[#071232] font-roboto text-[20px] font-bold ">ABS</h2>
    </div>
    
   </div>
   </div>
    <div className="border-2 border-yellow-500  flex max-h-[72vh] justify-between overflow-auto">
      {/* <DayTimeline
        openside={setOpenSidebar}
        events={events}
        currentDate={currentDate}
      /> */}

      <DayTimelineDemo
       openside={setOpenSidebar}
       events={events}
       currentDate={currentDate}
      />
      {opensidebar && (
        <motion.div
          animate={{ x: -50 }}
          className={` absolute right-0  bg-[#ffffff] flex shadow-lg border rounded-md ${
            openlist ? "w-[40%]" : "w-[20%]"
          } h-[75vh] `}
        >
          {openlist && (
            <div className="bg-white border-r-2 p-2 max-h-[75vh] overflow-auto  w-full">
              {eventList.map((event) => (
                <div
                  onClick={() => setSideEvents([event])}
                  className=" cursor-pointer mt-2 rounded-md bg-[#e9f4f5]  "
                >
                  <div className="flex items-center justify-evenly p-2  ">
                    <div className="bg-[#d6ebec] rounded-full p-1">
                      <img src={rooms} alt="" width={35} />
                    </div>
                    <div>
                      <div>
                        <h1 className="font-poppins">{event.batchname}</h1>
                      </div>
                      <div className="flex">
                        <h1 className="font-poppins">
                          {event.start_time} - {event.end_time} *
                        </h1>
                        <h1 className="font-poppins">{event.staffname}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={` w-full `}>
            <div className="flex justify-between p-5">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setOpenSidebar(false, eventList);
                  setOpenList(false);
                }}
              >
                <AiOutlineClose color="red" fontSize={20} />
              </div>
              <div className="flex gap-3 cursor-pointer">
                <AiOutlineEdit
                  color="blue"
                  fontSize={20}
                  onClick={() =>
                    navigate(`/category/addbatch/${eventList[0]._id}`)
                  }
                />
                {Loading ? (
                  <div
                    class="inline-block  h-5 w-5 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                ) : (
                  <AiOutlineDelete
                    color="red"
                    fontSize={20}
                    onClick={() => handledeleteBatch(eventList[0]._id)}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-center">
              {sideEvents.slice(-1).map((evt) => (
                <div className=" gap-5 w-[80%] flex flex-col justify-between">
                  <div className="flex ">
                    <h1 className="font-poppins text-[20px]">
                      {evt.batchname}
                    </h1>
                  </div>

                  <div className="flex gap-4 items-center">
                    <BsCalendarDate color="#2489ef" />
                    <h1>{displaydate(evt.start_date)}</h1> to{" "}
                    <h1>{displaydate(evt.end_date)}</h1>
                  </div>
                  <div className="flex gap-5 items-center">
                    <BsCalendarDate color="#2489ef" />

                    <h1>
                      {monthDiff(
                        new Date(evt.start_date),
                        new Date(evt.end_date)
                      )}{" "}
                      Months
                    </h1>
                  </div>
                  <div className="flex items-center gap-5">
                    <AiOutlineClockCircle color="#fc8e00" />
                    <h1>
                      {evt.start_time} - {evt.end_time}
                    </h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <img src={rooms} width={30} alt="rooms" />
                    <h1>{evt.room}</h1>
                  </div>
                  <div className=" font-poppins gap-4 flex">
                    <PiStudentFill color="#fe1e61" fontSize={20} />
                    <div className="flex flex-col">
                      <div> 5 Present - 2 Absent </div>
                      <div>
                        Total= {sideEvents[0].students.length} Students{" "}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[#6d9ad1] font-poppins">
                      {sideEvents[0].students.length} Students invited
                    </h1>
                  </div>
                  <div className="flex flex-wrap max-h-[15vh] overflow-auto ">
                    {sideEvents.map((student) =>
                      student.students
                        .slice(
                          0,
                          openstudents ? sideEvents[0].students.length : 5
                        )
                        .map((list) => (
                          <div class="relative inline-flex items-center justify-center w-10 h-10  bg-gray-100 rounded-full dark:bg-gray-600">
                            <span
                              class="font-medium text-gray-600 dark:text-gray-300"
                              title={list.label.toUpperCase()}
                            >
                              {list.label.charAt(0).toUpperCase()}
                            </span>

                            <span class="bottom-0 right-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                          </div>
                        ))
                    )}
                    <div className="relative cursor-pointer">
                      {sideEvents[0].students.length >= 5 && (
                        <div
                          onClick={() => setStudents(true)}
                          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                        >
                          {
                            sideEvents[0].students.slice(
                              openstudents ? sideEvents[0].students.length : 5,
                              sideEvents[0].students.length
                            ).length
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setOpenList(!openlist)}
                    className="bg-[#4ca6a8] flex justify-center p-2 text-white rounded-md"
                  >
                    <button>View All</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
   </>
  );
};

export default DayCalender;
