import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import meet from "../assest/meet.png";
import rooms from "../assest/meeting.png";
import { useNavigate } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { GrDocumentText } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { sendmeetinglink } from "../actions/MeetingAction";
import { fetchbatchbyid } from "../api/addbatchRequest";
import loading from "../assest/loading.png";
import { MdDeleteOutline } from "react-icons/md";
import dayjs from "dayjs";
const EventsModel = ({ setclosemodel, events }) => {
  console.log(events, "events");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openstudents, setStudents] = useState(false);
  const [meetingLink, setMeetingLink] = useState(
    "https://meet.google.com/tih-kfdy-vrk"
  );
  const [Loading, setLoading] = useState(false);

  console.log(meetingLink, "meeting");
  // const [data, setData]=useState([])

  // const eventsdata = events ?? [];
  const [eventsdata, setEventsliat] = useState([events]);

  // useEffect(()=>{
  //   setLoading(true)
  //   const fetchbatch= async ()=>{

  //      const {data} = await fetchbatchbyid(eventsId)

  //      setData([data])
  //      setLoading(false)
  //   }

  //   fetchbatch()

  // },[eventsId])

  const sendmail = (e) => {
    e.preventDefault();

    dispatch(sendmeetinglink(meetingLink)).then((res) => {
      console.log(res, "sendail");
    });
  };
  const displaydate = (dates) => {
    let newDate = new Date(dates);

    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();

    return `${date}-${month}-${year}`;
  };
  // console.log(data,"ffffffffffffffff");
const classLiveCheck=(event)=>{
   
  return dayjs().isBefore(dayjs('2023-09-13')) && 'bg-blue-600' 
}

console.log(classLiveCheck,"check");
  return (
    <>
      <div className="h-screen w-full  bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-40 fixed z-50 left-0 top-0 flex justify-center items-center">
        <div className=" bg-[#ffffff] rounded-3xl w-[40%] h-[80vh]">
          {/* {
            Loading && (<div className="flex justify-center gap-2 items-center h-full">
            <img className="animate-spin" src={loading} width={40} alt="" />
            <span className="font-roboto">Please wait...</span>
        </div>)
           } */}

          <div className="bg-[#0d817b] rounded-t-3xl h-[45vh]">
            <div className="p-6">
              <div className="border-b border-opacity-5 p-1 flex justify-between">
                <div>
                  <h1 className="text-white font-poppins"> Batch Details</h1>
                </div>

                <div
                  onClick={() => setclosemodel(false)}
                  className="cursor-pointer"
                >
                  <AiOutlineCloseCircle fontSize={20} color="#fff" />
                </div>
              </div>

              <div className=" mt-2 ">
                {eventsdata.map((evnt) => (
                 
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                      <div className="text-white text-lg font-poppins">
                        {evnt.batchname}
                       
                      </div>{" "}
                      <div className="flex gap-5">
                        <div className="cursor-pointer">
                          <MdDeleteOutline fontSize={20} color="white" />
                        </div>{" "}
                        <div
                          onClick={() => navigate("/category/addbatch")}
                          className="cursor-pointer"
                        >
                          <AiOutlineEdit fontSize={20} color="#fff" />
                        </div>
                      </div>{" "}
                    </div>
                    <div className="flex gap-2">
                      <img src={rooms} width={23} alt="" />{" "}
                      <h1 className="text-white font-poppins">{evnt.room}</h1>
                    </div>
                    <div className="text-white text-sm font-poppins flex items-center gap-2">
                      <PiStudentFill fontSize={17} />{" "}
                      <span className="">{5} Present</span>-{" "}
                      <span className="">{0} Absent </span> / Total={" "}
                      <span> {15} Students </span>
                    </div>
                    <div className="text-white text-sm font-poppins flex items-center gap-2">
                      <BsFillCalendarDateFill /> {displaydate(evnt.start_date)}{" "}
                      to {displaydate(evnt.end_date)}{" "}
                    </div>
                    <div className="text-white text-sm font-poppins flex items-center gap-2">
                      <BiTimeFive fontSize={17} /> {evnt.start_time} -{" "}
                      {evnt.end_time}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="p-2 cursor-pointer text-sm text-white bg-gray-700 rounded-md bg-clip-padding backdrop-filter font-poppins backdrop-blur-sm bg-opacity-20 border flex gap-1 border-gray-100">
                          <img width={20} src={meet}></img> Join With Google
                          Meet{" "}
                        </div>

                        <button onClick={sendmail} className="cursor-pointer">
                          <AiOutlineSend color="#fff" fontSize={20} />
                        </button>
                      </div>

                      <div className={`text-white ${classLiveCheck(evnt)}`}> Live </div>
                    </div>

                    <div className=" py-3">
                      <h1 className="text-[#6d9ad1] font-poppins">
                        {eventsdata[0].students.length} Students invited
                      </h1>
                      <div className="flex  max-h-[12vh] overflow-auto mb-1 -space-x-1 flex-wrap">
                        {eventsdata.map((student) =>
                          student.students
                            .slice(
                              0,
                              openstudents ? eventsdata[0].students.length : 10
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
                          {eventsdata[0].students.length >= 10 && (
                            <a
                              onClick={() => setStudents(true)}
                              className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                            >
                              {
                                eventsdata[0].students.slice(
                                  openstudents
                                    ? eventsdata[0].students.length
                                    : 10,
                                  eventsdata[0].students.length
                                ).length
                              }
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="div">
                      <div className="flex gap-1 items-center">
                        <GrDocumentText />{" "}
                        <h1 className="font-poppins">Documents</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsModel;
