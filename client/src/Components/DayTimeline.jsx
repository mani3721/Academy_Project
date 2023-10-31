import React, { useEffect, useState } from "react";
import EventList from "./DayEvents";

const DayTimeline = ({ events, openside, currentDate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Filter events for the selected date and for the "Talento" and "Abs" rooms
  const eventsForSelectedDate = events.filter(
    (event) => event.dates.includes(currentDate) && (event.room === "Talento" || event.room === "Abs")
  );

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

  return (
    <div className="border-2 border-blue-700 flex w-full h-full">
    <div
  className="bg-red-500 h-5 p-5 absolute duration-600"
  style={{ left: `${(currentTime.getMinutes() / 60) * 100}%` }}/>
      
      <ul>
      <div className="flex gap-4 px-5 font-poppins">
          <div className="text-[#525b68]">Time</div>
          <div className="border-2 border-red-500">
            <h1>Talento</h1>
          </div>
          <div className="border-2 border-green-500">
            <h1>Abs</h1>
          </div>
        </div>
        {hours.map((hour) => (
          <div key={hour} className="flex gap-4 px-5 font-poppins">
            <div className="text-[#525b68]">{tConv24(hour)}</div>
            <div className="border-2 border-red-500 flex gap-5">
              {/* <h1>Talento</h1> */}
              <div className="py-8">
                <EventList
                  opensideBar={openside}
                  events={eventsForSelectedDate.filter((event) => event.room === "Talento")}
                  hour={hour}
                  currentTime={currentTime}
                />
              </div>
            </div>
            <div className="border-2 border-green-500 flex gap-5">
              {/* <h1>Abs</h1> */}
              <div className="py-8">
                <EventList
                  opensideBar={openside}
                  events={eventsForSelectedDate.filter((event) => event.room === "Abs")}
                  hour={hour}
                  currentTime={currentTime}
                />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DayTimeline;
