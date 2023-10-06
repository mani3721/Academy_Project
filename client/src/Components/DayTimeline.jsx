import React, { useEffect, useState } from "react";
import EventList from "./DayEvents";

const DayTimeline = ({ events ,openside}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const hours = Array.from({ length: 24 }, (_, i) => i); // Generate an array of 0 to 23
  console.log(hours);
  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="">
      <ul>
        {hours.map((hour) => (
          <div key={hour} className="h-32 flex gap-4 px-5 font-poppins ">
        <div className="">
        {hour.toString().padStart(2, '0')}:00 {hour>12 ? 'pm': 'am'}
        </div>
      
          {/* {hour==currentTime.toLocaleTimeString().slice(0,2) && <p className="bg-fuchsia-700 absolute">Current Time: {currentTime.toLocaleTimeString()}</p>} */}
          <div className="py-5">
          <EventList opensideBar={openside} events={events} hour={hour}  currentTime={currentTime}/>
          </div>
        </div>
        ))}
      </ul>
      
    </div>
  );
};

  export default DayTimeline 
