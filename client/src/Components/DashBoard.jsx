import React, { useEffect, useState } from "react";
import logo from "../assest/logo.png";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "../Container/Framermotion";
import { BiSolidUser } from "react-icons/bi";
import { AiTwotoneFire } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import Week from "./Week";
import Events from "./Events";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import {AiOutlinePlus} from 'react-icons/ai'
import grow from "../assest/grow.png";
import { CalenderData, deleteDashCard, getDashBaordData } from "../api/DashBoardRequest";
import {MdDeleteOutline} from 'react-icons/md'
import {FaUserTie} from 'react-icons/fa'
import SideBar from "./sideBar";
import { getAllStaffData } from "../api/StaffRequest";
import PageFooter from "./PageFooter";
import { getAllStudentData } from "../api/StudentRequest";

const DashBoard = () => {
  // const Loading = useSelector((state) => state.StudentReducer.loading);
  const [count, setCount] = useState(0);
const [Loading, setLoading]=useState(false)
  const navigate = useNavigate();


  const [studentData, setStudentData] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(moment().startOf("day"));
  const [selectedMonthEvents, setSelectedMonthEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [id, setID]=useState('')
  const [getCall, setGetCall]=useState('')
const [staffCount, setStaffCount]=useState(0)
 


const [fetcheventscall,setFetchEventsCall]=useState([])


  const [ranking, setRanking]=useState([])

  const [data, setData] = useState([
    {
      image: <BiSolidUser />,
      count: "51",
      title: "Total Student",
    }
  ]);

  useEffect(() => {
    const fetcAllStudentData = async () => {
      const { data } = await getAllStudentData();
      setCount(data?.length);
      setStudentData(data);
     
      let fullstack= data.filter((item)=>{return item.course==="Full Stack Developer"} )
      let uiux= data.filter((item)=>{return item.course==="UI/UX"} )
      let front= data.filter((item)=>{return item.course==="Front End Developer"} )
      let back= data.filter((item)=>{return item.course==="Back End Developer"} )
    
      const fullper = ((fullstack?.length)/(data?.length))*100
      const uiuxper = ((uiux?.length)/(data?.length))*100
      const frontend = ((front?.length)/(data?.length))*100
      const backend = ((back?.length)/(data?.length))*100
     

      const setRankingData=([
      {
         id:1,
         count:fullstack.length,
         course:"Full Stack Developer",
         percentage:fullper,
         color:"#ff7b7b"

      },
      {
        id:2,
        count:uiux.length,
        course:"UI/UX",
        percentage:uiuxper,
        color:"#8cd7f5"

     },
     {
      id:3,
      count:front.length,
      course:"Front End Developer",
      percentage:frontend,
      color:"#8cd7f5"

   }
   ,
     {
      id:4,
      count:back.length,
      course:"Back End Developer",
      percentage:backend,
      color:"#a8adff"

   }
    
    ])
    const numAscending = [...setRankingData].sort((a, b) => a.count - b.count);
     setRanking(numAscending.reverse())
  
    };

  

    const getAllStaff= async ()=>{
      const {data}= await getAllStaffData()
  
      
  
      setStaffCount(data?.length)
     
     } 
  
  
     getAllStaff()
     fetcAllStudentData();
  }, []);

 

//get card data
  useEffect(() => {
    const fetcAllDashData = async () => {
      const { data } = await getDashBaordData();
      setData(data)
    };

    fetcAllDashData();
  }, [getCall]);

  //calender

  const select = (day) => {
    setSelectedMonth(day.date);
    setSelectedDay(day.date.clone());
    setShowEvents(true);
  };

  const renderWeeks = () => {


    let weeks = [];
    let done = false;
    let previousCurrentNextView = selectedMonth
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Monday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={selectedMonth}
          monthEvents={selectedMonthEvents}
          selected={selectedDay}
          select={(day) => select(day)}
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  };

  // const goToCurrentMonthView = () => {
  //   const currentMonthView = selectedMonth;
  //   setSelectedMonth(moment());
  // };

  // const renderTodayLabel = () => {
  //   const currentSelectedDay = selectedDay;
  //   return (
  //     <span className="box today-label" onClick={goToCurrentMonthView}>
  //       Today
  //     </span>
  //   );
  // };

  const renderMonthLabel = () => {
    const currentMonthView = selectedMonth;
    return (
      <span className="box month-label">
        {currentMonthView.format("MMMM YYYY")}
      </span>
    );
  };
  const next = () => {
   

    setSelectedMonth(selectedMonth.clone().add(1, 'month'));
  };

  const previous = () => {
    setSelectedMonth(selectedMonth.clone().subtract(1, "month"));

  };

  // const removeEvent = (i) => {
  //   const monthEvents = selectedMonthEvents.slice();

  //   const currentSelectedDate = selectedDay;
  //   if (window.confirm("Are you sure you want to remove this event?")) {
  //     let index = i;

  //     if (index != -1) {
  //       let final = monthEvents.splice(index, 1);

      
  //     } else {
  //       alert("No events to remove on this day!");
  //     }

  //     setSelectedMonthEvents(monthEvents);
  //   }
  // };

  const handleAdd = () => {

    let newEvents = [];

    var eventTitle = prompt("Please enter a name for your event: ");

    switch (eventTitle) {
      case "":
        alert("Event name cannot be empty.");
        break;
      case null:
        alert("Changed your mind? You can add one later!");
        break;
      default:
        var newEvent = {
          title: eventTitle,
          date: selectedDay,
          dynamic: true,
        };

        newEvents.push(newEvent);

        for (var i = 0; i < newEvents.length; i++) {
          selectedMonthEvents.push(newEvents[i]);
        }

         CalenderData(newEvent).then((res)=>{
        
           setFetchEventsCall(res)
         })
        setSelectedMonthEvents(selectedMonthEvents);
     
        break;

        
    }
  };

  const addEvent = () => {
    const currentSelectedDate = selectedDay;
    let isAfterDay = moment().startOf("day").subtract(1, "d");

    if (currentSelectedDate.isAfter(isAfterDay)) {
      handleAdd();
    } else {
      if (
        window.confirm("Are you sure you want to add an event in the past?")
      ) {
        handleAdd();
      } else {
      }
    }
  };

  const showCalendar = () => {
    setSelectedMonth(selectedMonth);
    setSelectedDay(selectedDay);
    setShowEvents(false);
  };
  const renderDayLabel = () => {
    const currentSelectedDay = selectedDay;
    return (
      <span className="box month-label">
        {currentSelectedDay.format("DD MMMM YYYY")}
      </span>
    );
  };


//split degits
function applyCommasForAmount(amount) {
  if (amount) {
    amount = amount.toString();
    if (!amount.includes(',')) {
      amount = amount.toString();
      amount = amount.split(',').join('');
      if (amount.length > 3) {
        var newAmount = amount.split('');
        newAmount.splice(-3, 0, ',');
        amount = newAmount.join('');
        if (amount.length > 6) {
          var _newAmount = amount.split('');
          _newAmount.splice(-6, 0, ',');
          amount = _newAmount.join('');
        }
        return amount;
      }
    }
    return amount;
  }
  return amount;
}


const applyPerecentage=(total)=>{
    if (total) {
      let result=(total/100)
      return result
    }
        
}

const handleDelete= async (id)=>{
  setLoading(true)
  setID(id)
  id && await deleteDashCard(id).then((res)=>{
   
    setLoading(false)
    setGetCall(res)
  })

}


  return (
    <>
      <AnimatedPage>
        <div className="bg-[#ffffff]">
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center justify-start">
              <div className="px-3">
                <Link to="/">
                  <img src={logo} alt="" width={150} />
                </Link>
              </div>
              <div className="px-[26px]">
                <h1 className="font-poppins text-[26px] font-semibold">
                  Dashboard
                </h1>
              </div>
            </div>
            <div className="items-center mr-11 hidden md:flex ">
              <div className="flex items-center p-3 w-[450px] bg-[#f7f7ff] rounded-2xl">
                <FiSearch color="#989fb9" fontSize={20} />
                <input
                  type="text"
                  className="bg-transparent outline-none w-[100%] px-2 placeholder:font-poppins"
                  placeholder="Search..."
                />
              </div>
              <div className="px-5 ">
                <button className="bg-[#3b5be9] text-white font-poppins rounded-2xl px-5 py-2.5">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
           <SideBar/>
            {/* bg-[#f6f8fa] */}
            <div className=" flex flex-col gap-4  p-2 w-[80%]">
              <div className="flex">
                <div class="flex flex-col bg-white m-auto p-auto w-[70rem]">
                  <div class="flex overflow-x-scroll hide-scroll-bar">
                    <div class="flex flex-nowrap ">
                      <div class=" flex gap-5">
                      <div class="w-64 justify-between flex  h-[23vh] border-2 border-[#eceef6]  max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                          <div className="p-6 flex justify-between flex-col ">
                          <div className="flex items-center ">
                          <FaUserTie style={{color:"blue"}}/>
                            <div className="flex items-center px-3 gap-2">
                              <img src={grow} alt="" width={25}  />
                              <h1 className="font-poppins"> {applyPerecentage(count)}</h1>
                            </div>
                           </div>
                           <div className="font-poppins font-extrabold text-[25px]">
                   {count}
                           </div>
                           <div className="font-poppins">
                         Total Students
                           </div>
                          </div>
                          </div>
                          <div class="w-64 justify-between flex  h-[23vh] border-2 border-[#eceef6]  max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                          <div className="p-6 flex justify-between flex-col ">
                          <div className="flex items-center ">
                          <BiSolidUser style={{color:"blue"}}/>
                            <div className="flex items-center px-3 gap-2">
                              <img src={grow} alt="" width={25}  />
                              <h1 className="font-poppins"> {applyPerecentage(staffCount)}</h1>
                            </div>
                           </div>
                           <div className="font-poppins font-extrabold text-[25px]">
                   {staffCount}
                           </div>
                           <div className="font-poppins">
                         Total Staffs
                           </div>
                          </div>
                          </div>
                        {
                          data.map((item)=>(
                            <div class="w-64 group justify-between flex  h-[23vh] border-2 border-[#eceef6]  max-w-xs overflow-hidden rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                          <div className="w-[100%] p-6 flex justify-between flex-col ">
                          <div className="flex items-center ">
                          <BiSolidUser style={{color:"blue"}}/>
                            <div className="flex items-center px-3 gap-2">
                              <img src={grow} alt="" width={25}  />
                              <h1 className="font-poppins"> {applyPerecentage(item.count)}</h1>
                            </div>
                           </div>
                           <div className="font-poppins font-extrabold text-[25px]">
                            {applyCommasForAmount(item.count)}
                           </div>
                           <div className="font-poppins flex items-center justify-between">
                            {item.title}
                            <div onClick={()=>handleDelete(item._id)} className="  cursor-pointer rounded-full w-7 h-7 flex items-center justify-center">
                          {
                            id === item._id && Loading ?   <div
                            class="inline-block  h-5 w-5 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                          ></div> :  <MdDeleteOutline color="#ff051e" fontSize={22}  className="hidden group-hover:block" />
                          }
              
                            </div>
                           
                           </div>
                          </div>
                          </div>
                          ))
                        }
                       
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className="bg-[#edf0ff] cursor-pointer  flex justify-center items-center p-1 rounded-xl" onClick={()=>navigate("/dashboard/card")}>
                  <AiOutlinePlus style={{color:'#3b5be9'}}/>
                  <button className="font-poppins text-[#3b5be9] px-1" >Add</button>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col gap-4 w-[50%] px-2">
                  <div className="bg-[#f4f4fe] rounded-lg p-4 gap-2  ">
                    <div className="flex justify-between  px-5 ">
                      <div>
                        <h1 className="font-poppins text-[20px] font-extrabold">
                          Popular Courses
                        </h1>
                      </div>
                      <div className="cursor-pointer">
                        <BsThreeDots />
                      </div>
                    </div>
                    {ranking.map((item,i) => (
                      <div className="flex justify-between px-5 py-2">
                        <div className="flex gap-2 items-center w-[40%]">
                          <AiTwotoneFire fontSize={20} style={{color:`${item.color}`}} />{" "}
                          <h1 className="font-poppins ">{item.course}</h1>
                        </div>
                        <div>
                          <h1 className="font-poppins">{item.count}</h1>
                        </div>
                        <div className="w-[40%] flex items-center">
                          <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            
                            <div
                              className={`text-xs font-mdium text-blue-100 text-center p-1 leading-none rounded-full`}
                               style={{ width:`${item.percentage}%`, backgroundColor:`${item.color}`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#f4f4fe] rounded-lg p-3 gap-2 ">
                    <div className="px-5">
                      <div className="flex justify-between">
                        <h1 className="font-poppins text-[18px] font-extrabold">
                          Last Students activity
                        </h1>
                        <Link to="/category/studentlist">
                          <div className="cursor-pointer font-poppins text-[#264ae7] text-[15px]">
                            View all
                          </div>
                        </Link>
                      </div>

                      <div>
                        <table>
                          <thead>
                            <th className="py-2 px-5 text-left">Student</th>
                            <th className="py-2 px-5 text-left">Course </th>
                            <th className="py-2 px-5 text-left">Date</th>
                          </thead>
                          <tbody>
                            {studentData
                              .slice(-2)
                              .reverse()
                              .map((student) => (
                                <tr>
                                  <td className="py-2 px-5 text-left whitespace-nowrap font-poppins text-sm">
                                    {student.name}
                                  </td>
                                  <td className="py-2 px-5 text-left whitespace-nowrap font-poppins text-sm">
                                    {student.course}
                                  </td>
                                  <td className="py-2 px-5 text-left whitespace-nowrap font-poppins text-sm">
                                    {student.date}
                                  </td>
                                </tr>
                              ))}
                            <tr>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[50%] flex justify-center py-5 ">
                  {showEvents ? (
                    <section className="flex flex-col justify-start flex-wrap w-[80%] gap-3">
                      <header className="flex justify-between w-[100%]  ">
                        <div>
                        <div onClick={showCalendar} className="bg-[#edf0ff] cursor-pointer font-poppins text-[#3b5be9] p-2 rounded-md">Back</div>
                        </div>
                        <div className="row title-header">
                          {renderDayLabel()}
                        </div>
                        <div className="row button-container">
                       
                          <div onClick={addEvent} className=" bg-[#edf0ff] cursor-pointer font-poppins text-[#3b5be9] p-2 rounded-md">Add Events</div>
                        </div>
                      </header>
                      <Events
                      fetcheventscall={fetcheventscall}
                        selectedMonth={selectedMonth}
                        selectedDay={selectedDay}
                        selectedMonthEvents={selectedMonthEvents}
                        // removeEvent={(i) => removeEvent(i)}
                      />
                    </section>
                  ) : (
                    <>
                      <section className="">
                      
                          <div className=" flex justify-between items-center font-poppins">
                            <div onClick={previous} className="cursor-pointer flex items-center p-2 rounded-md">
                              <AiOutlineDoubleLeft fontSize={20} />
                            </div>
                            <div className=" cursor-pointer font-poppins flex">
                              {/* {renderTodayLabel()} */}
                              <div className="px-5">{renderMonthLabel()}</div>
                            </div>
                            <div onClick={next} className="cursor-pointer  flex items-center p-2 rounded-md">
                              <AiOutlineDoubleRight fontSize={20} />
                            </div>
                          </div>
                          <div className="row days-header font-bold font-poppins py-2">
                            <span className="box day-name px-5 ">Mon</span>
                            <span className="box day-name px-5">Tue</span>
                            <span className="box day-name px-5">Wed</span>
                            <span className="box day-name px-5">Thu</span>
                            <span className="box day-name px-5">Fri</span>
                            <span className="box day-name px-5">Sat</span>
                            <span className="box day-name px-5">Sun</span>
                          </div>
                  
                        <div className="days-containe  ">{renderWeeks()}</div>
                      </section>
                    </>
                  )}
                </div>
              </div>
            </div>
          
          </div>
          <div>
             <PageFooter/>
            </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default DashBoard;
