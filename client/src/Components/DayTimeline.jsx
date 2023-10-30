import React, { useEffect, useState } from "react";
import EventList from "./DayEvents";

const DayTimeline = ({ events ,openside,currentDate }) => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const hours = Array.from({ length: 24 }, (_, i) => i); // Generate an array of 0 to 23
 
  
  useEffect(() => {
    // Update the current time every 1 minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1 minute = 60,000 milliseconds

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  const eventsForSelectedDate = events.filter((event) =>  event.dates.includes(currentDate));
 
  console.log(eventsForSelectedDate,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  function tConv24(time24) {

    let format=`${time24.toString().padStart(2, '0')}:00`

    // console.log(`${time24.toString().padStart(2, '0')}:00`,"timeeeeee");
    var ts = format;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };

  console.log(tConv24('18:00'),"covert");
  return (
    <div className="bg-yellow-400 h-full">
      
      <ul>
        {hours.map((hour) => (
          <div key={hour} className=" flex gap-4 px-5 font-poppins ">
        <div className="text-[#525b68]">
          {tConv24(hour)}
        {/* {hour.toString().padStart(2, '0')}:00 {hour>12 ? 'pm': 'am'} */}
        </div>

        
     
      
          {/* {<p className="bg-fuchsia-700 relative">Current Time: {currentTime.toLocaleTimeString()}</p>} */}
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
