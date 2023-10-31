import React, { useEffect, useState } from "react";
import { deleteEvents, fetchEvents } from "../api/DashBoardRequest";
import moment from "moment";
import {MdDeleteOutline} from 'react-icons/md'
  const Events=({selectedDay,selectedMonthEvents,removeEvent,fetcheventscall })=>{

    
    const [monthEvents, setmonthEventsRendered]=useState([])
    const [Loading, setLoading]=useState(false)
    const [id, setID]=useState('')
    const [getCall, setGetCall]=useState('')
    useEffect(()=>{
      const fetchEventsData= async ()=>{
         const {data}= await fetchEvents()


         setmonthEventsRendered(data)
      }

      fetchEventsData()
   },[fetcheventscall,getCall])

   const handledelete=(id)=>{
    setID(id)
      setLoading(true)
      id && deleteEvents(id).then((res)=>{
        setGetCall(res)
        setLoading(false)
      })

   }

    const monthEventsRendered = monthEvents.map((event, i) => {
        return (
          <div
            key={event.title}
            className="event-container flex justify-between"
            // onClick={() => removeEvent(i)}
          >
         
              {/* <div className="event-time event-attribute">
                {moment(event.date).startOf("day").format("HH:mm")}
              </div> */}
               
           
              <div className="event-title event-attribute">{event.title}</div>
         <div className="cursor-pointer" onClick={()=>handledelete(event._id)}>
         {
            id === event._id && Loading ?   <div
            class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
            ></div> :  <MdDeleteOutline fontSize={20}/>
       }
         </div>
          </div>
        );
      });
  
      const dayEventsRendered = [];
  
      for (var i = 0; i < monthEventsRendered.length; i++) {
        if (moment(monthEvents[i].date).startOf("day").isSame(selectedDay, "day")) {
          dayEventsRendered.push(monthEventsRendered[i]);
        }
      }



    return (
        <div className="bg-[#f4f4fe] flex-col gap-2 overflow-y-auto border-l-4 flex font-poppins rounded-md px-3 p-2 border-[#3b5be9] ">
        {!dayEventsRendered?.length ? " No Events" : dayEventsRendered}
      </div>

    )
  }

  export default Events