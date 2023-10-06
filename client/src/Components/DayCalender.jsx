import React, { useState } from "react";
import DayEvents from "./DayTimeline";
import DayTimeline from "./DayTimeline";
import { AiOutlineClockCircle, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {GiCrossMark} from 'react-icons/gi'
import { motion } from "framer-motion";
import { BsCalendarDate } from "react-icons/bs";
import rooms from '../assest/daymeeting.png'
const DayCalender=()=>{
  const [opensidebar, setOpenSidebar]=useState(false)
    const [events, setEvents] = useState([
        { id: 1, title: 'Meeting 1', date: '2023-09-06',rooms:"Talento", startTime: '09:50', endTime: '10:00' },
        // { id: 2, title: 'Lunch', date: '2023-09-06', startTime: '12:00', endTime: '13:00' },
        // { id: 3, title: 'Meeting 2', date: '2023-09-07', startTime: '15:00', endTime: '16:00' },
      ]);
    
      return (
        <div className="  flex max-h-[75vh] justify-between overflow-auto">
          <DayTimeline openside={setOpenSidebar} events={events} />
          {
            opensidebar &&   <motion.div animate={{ x: -50 }}  className=" absolute right-0 bg-yellow-400 w-[20%] h-[75vh]">
            <div className="flex justify-between p-5">
              <div className="cursor-pointer" onClick={()=>setOpenSidebar(false)}>
                <GiCrossMark />
              </div>
            <div className="flex gap-3 cursor-pointer">
            <AiOutlineEdit fontSize={20}/>
             <AiOutlineDelete fontSize={20}/>
  
            </div>
  
            </div>

            <div className="flex justify-center">
              {
                events.map((evt)=>(
                  <div className="bg-emerald-400 gap-3 flex flex-col justify-between">
                    <div className="flex ">
                      <h1 className="font-poppins text-[20px]">{evt.title}</h1>
                    </div>
                    <div className="">
                     <div className="flex gap-5 items-center">
                     <BsCalendarDate/>
                      <h1>{evt.date}</h1> to <h1>{evt.date}</h1>

                     </div>
                     <div className="flex items-center gap-5">
                     <AiOutlineClockCircle/>
                      <h1>{evt.startTime} - {evt.endTime}</h1>
                     </div>
                     <div className="flex gap-2 items-center">
                     <img src={rooms} width={30}/> 
                      <h1>{evt.rooms}</h1>
                      
                     </div>
                    </div>
                  
                  </div>
                ))
              }
            </div>
           
             </motion.div>
          }
         
        </div>
      );
    
    
}

export default DayCalender