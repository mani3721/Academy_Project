import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./sideBar";
import AnimatedPage from "../Container/Framermotion";
import { AiOutlineLeft, AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Month from "./Months";
import DayCalender from "./DayCalender";
import dayjs from "dayjs";
import EventsModel from "./EventsModel";
import { getMonth } from "../utils/calender";
import { fetchAllBatch } from "../api/addbatchRequest";
// import Apps from "./props";


const Schedule = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Week");
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const [getCall, setGetCalls]=useState(false)
  const [monthIndex, setMonthIndex]=useState(dayjs().month())

  const [sendEvents, setEvents]=useState([])
  const [dataa, setDataa]=useState([])

 

 

  const [events, setevents]=useState([])


const [openModel, setOpenModel]=useState(false)
  const setgetmodeldata=(data, active)=>{
    setevents(data)
    setOpenModel(active)
  }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const today=()=>{
    
    const date=new Date()
const month= date.getMonth()+1
const day= date.getDate()
const year= date.getFullYear()

let curentDate=`${year}-${month}-${day}`


    active=='Week' ? setMonthIndex(
      monthIndex===dayjs().month() ? monthIndex+Math.random():dayjs().month()
     ) : setCurrentDate(curentDate)
  }

  
  


  useEffect(()=>{
    const fetchdatas=async()=>{

      const {data}= await fetchAllBatch()

      setDataa(data)

      setOpenModel(false)
    }
    fetchdatas()
  },[getCall])
  

  const time = new Date().getHours();
let greeting;
if (time < 11) {
  greeting = "Good Morning!";
} else if (time < 19) {
  greeting = "Good Afternoon!";
} else {
  greeting = "Good Evening!";
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];




const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayFormattedDate = () => {
  const today = new Date();
  return formatDate(today);
};

const [currentDate, setCurrentDate] = useState(getTodayFormattedDate());

const changeDateByDays = (days) => {
  const currentDateObj = new Date(currentDate);
  currentDateObj.setDate(currentDateObj.getDate() + days);
  setCurrentDate(formatDate(currentDateObj));
};




const date=new Date()
const month= date.getMonth()+1
const day= date.getDate()
const year= date.getFullYear()

function formatDates(inputDate) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const parts = inputDate.split('-');
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based
  const year = parseInt(parts[0], 10) % 100; // Get the last two digits of the year

  const formattedDate = `${day} ${months[month]} ${year}`;

  return formattedDate;
}


  return (
    <>
      <AnimatedPage>
        <div>
          <div>
            <NavBar />

             
          </div>
          <div className="flex">
                 {openModel && <EventsModel events={events} setGetCall={(e)=>setGetCalls(e)}  setclosemodel={()=>setOpenModel(false)}/>}
            <div className="py-8">
              <SideBar />
            </div>
           <div className="w-[84%]">
           <div className="">
              <div className="flex justify-between w-full p-5">
                <div>
                  <h1 className="text-[20px]  font-semibold font-poppins">
                  {active=='Week' ? dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY") :formatDates(currentDate)}
                  </h1>
                  <h1 className="font-poppins ">
                    Today is {monthNames[date.getMonth()]}, {day}th, {year}
                  </h1>
                </div>
               
                <div className="flex gap-5 py-1">
                <div className="flex items-center gap-3">
                  <button onClick={()=>{ active=='Week' ? setMonthIndex(monthIndex-1) : changeDateByDays(-1)}}><AiOutlineLeft fontSize={23}/></button>
                  <div onClick={today} className="cursor-pointer">
                    <h1 className="bg-[#e8ebed] p-2 rounded-md font-roboto">Today</h1>
                  </div>
                  <button onClick={()=>{ active == 'Week' ? setMonthIndex(monthIndex+1) : changeDateByDays(+1)}}> <AiOutlineRight fontSize={23}/></button>
                </div>
                  <div className="bg-gray-200   leading-none  border-gray-200 rounded-xl p-0.5 inline-flex">
                    <button
                      onClick={() => setActive("Week")}
                      className={` ${
                        active == "Week" && "bg-white rounded-xl shadow-lg "
                      } inline-flex py-3 items-center transition-colors duration-300 ease-in  font-roboto  rounded-full px-5  active" id="grid`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setActive("Day")}
                      className={` ${
                        active == "Day" && "bg-white  rounded-xl shadow-lg "
                      } inline-flex items-center font-roboto transition-colors duration-300 ease-in  px-5 " id="list`}
                    >
                      Day
                    </button>
                  </div>

                  <div  onClick={() => navigate("/category/addbatch/add")} className="flex bg-[#583bed] px-2 py-1 rounded-md text-white">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <AiOutlinePlus />
                      <button
                       
                        className="font-roboto"
                      >
                        Create Batch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  ">
              {active =="Week" ?  <AnimatedPage> <div className=""> <Month setOpenCal={()=>setGetCalls(!getCall)} data={dataa} month={currenMonth} getmodeldata={setgetmodeldata}/></div> </AnimatedPage>   : <AnimatedPage> <DayCalender currentDate={currentDate} setGetCall={(e)=>setGetCalls(e)}/></AnimatedPage>  }
            
            </div>
           </div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Schedule;
