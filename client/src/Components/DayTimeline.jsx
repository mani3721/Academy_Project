import React, { useEffect, useState } from "react";
import EventList from "./DayEvents";

const DayTimeline = ({ events }) => {
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
          <li key={hour}>
            {hour.toString().padStart(2, '0')}:00
            <EventList events={events} hour={hour}  currentTime={currentTime}/>
            {hour==currentTime.toLocaleTimeString().slice(0,2) && <p className="bg-fuchsia-700 absolute">Current Time: {currentTime.toLocaleTimeString()}</p>}
            
          </li>
        ))}
      </ul>
      
    </div>
  );
};

  export default DayTimeline 
