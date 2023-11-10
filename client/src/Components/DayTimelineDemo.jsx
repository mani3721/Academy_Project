import React, { useEffect, useState } from "react";
import EventList from "./DayEvents";

const DayTimelineDemo = ({ events, openside, currentDate }) => {
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
    (event) =>
      event.dates.includes(currentDate) &&
      (event.room === "Talento" || event.room === "Abs")
  );

  function tConv24(time24) {
    let format = `${time24.toString().padStart(2, "0")}:00`;

    // console.log(`${time24.toString().padStart(2, '0')}:00`,"timeeeeee");
    var ts = format;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " am" : " pm";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
  return (
    <div className="w-full  px-5">
      {hours.map((hour) => (
        <div
          key={hour}
          className="flex px-5  py-10 font-poppins justify-between"
        >
          <div className="text-[#525b68] font-Tinos p-4">{tConv24(hour)}</div>
          <div
            className={`flex  justify-between  zebra-stripe w-[80%] rounded-md  `}
          >
            <div>
              <EventList
                opensideBar={openside}
                events={eventsForSelectedDate.filter(
                  (event) => event.room === "Talento"
                )}
                hour={hour}
                currentTime={currentTime}
              />
            </div>
            <div>
              <EventList
                opensideBar={openside}
                events={eventsForSelectedDate.filter(
                  (event) => event.room === "Abs"
                )}
                hour={hour}
                currentTime={currentTime}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayTimelineDemo;
