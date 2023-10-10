import React, { useEffect, useState } from "react";
import EventList from "./DayEvents";

const DayTimeline = ({ events ,openside,currentDate }) => {
  console.log(events,currentDate,"eventsssss");
  const [currentTime, setCurrentTime] = useState(new Date());
  const hours = Array.from({ length: 24 }, (_, i) => i); // Generate an array of 0 to 23
  console.log(hours);
  
  // useEffect(() => {
  //   // Update the current time every second
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => {
  //     // Clean up the interval when the component unmounts
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const eventsForSelectedDate = events.filter((event) =>  event.dates.includes(currentDate));
 
  console.log(eventsForSelectedDate,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  // function tConv24(time24) {
  //   var ts = time24;
  //   var H = +ts.substr(0, 2);
  //   var h = (H % 12) || 12;
  //   h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
  //   var ampm = H < 12 ? " AM" : " PM";
  //   ts = h + ts.substr(2, 3) + ampm;
  //   return ts;
  // };
  return (
    <div className="">
      <ul>
        {hours.map((hour) => (
          <div key={hour} className="h-32 flex gap-4 px-5 font-poppins ">
        <div className="text-[#525b68]">
        {hour.toString().padStart(2, '0')}:00 {hour>12 ? 'pm': 'am'}
        </div>
      
          {/* {hour==currentTime.toLocaleTimeString().slice(0,2) && <p className="bg-fuchsia-700 absolute">Current Time: {currentTime.toLocaleTimeString()}</p>} */}
          <div className="py-8">
          <EventList opensideBar={openside} events={eventsForSelectedDate}  hour={hour}  currentTime={currentTime}/>
          </div>
        </div>
        ))}
      </ul>
      
    </div>
  );
};

  export default DayTimeline 
