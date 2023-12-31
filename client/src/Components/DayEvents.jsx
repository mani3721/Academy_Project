import { BsThreeDotsVertical } from "react-icons/bs";
import rooms from "../assest/daymeeting.png";
import { SiBlockchaindotcom } from "react-icons/si";
const EventList = ({ events, hour, currentTime, opensideBar }) => {
  // const eventsInHour = events.filter((event) => {
  //   const startHour = parseInt(event.start_time.split(":")[0]);
  //   const endHour = parseInt(event.end_time.split(":")[0]);
  //   return startHour <= hour && hour < endHour ;
  // });

  const eventsInHour = events.filter((event) => {
    const startHour = parseInt(event.start_time.split(":")[0]);
    const startMinute = parseInt(event.start_time.split(":")[1]);

    // Calculate the end time of the event in minutes
    const eventEndTimeInMinutes = startHour * 60 + startMinute + 60; // 60-minute constraint

    return startHour === hour && eventEndTimeInMinutes > hour * 60; // Check if event fits in the hour
  });

  const isBefore = (dates) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let result = {};

    for (const evtdate of dates) {
      const date = new Date(evtdate);
      date.setHours(0, 0, 0, 0);

      if (date < today) {
        result[evtdate] = "line-through";
      } else {
        result[evtdate] = "future";
      }
    }

    return result;
  };

  let dates = ["2023-10-02", "2023-10-05", "2023-10-20"];

  console.log(isBefore(dates)[dates]);

  function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    // var ampm = H < 12 ? " AM" : " PM";     + ampm;
    ts = h + ts.substr(2, 3);
    return ts;
  }
  return (
    <div
      onClick={() => opensideBar(true, eventsInHour)}
      className="bg-[#e9f4f5] shadow-md cursor-pointer  flex items-center rounded-md h-15"
    >
      {eventsInHour.slice(-1).map((event) => (
        <div
          key={event.id}
          className={`p-2 flex items-center justify-center  ${
            isEventActive(event, currentTime) ? "text-green-600" : ""
          }`}
        >
          {events.length > 1 && (
            <span className=" inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-[#4338ca] rounded-r-full rounded-l-full">
              {events.length - 1}
            </span>
          )}

          <div className="flex items-center gap-5 ">
            <div className="bg-[#d6ebec] rounded-full p-1">
              <img src={rooms} alt="" width={35} />
            </div>
            <div>
              <div>
                <h1 className="font-poppins">{event.batchname}</h1>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-poppins">
                  {tConv24(event.start_time)} - {tConv24(event.end_time)} 
                </h1>
                <SiBlockchaindotcom fontSize={12}/>
                <h1 className="font-poppins">{event.staffname}</h1>
              </div>
            </div>
            <div className="cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// <span className="">{event.title}</span>
//           <img src={rooms} width={40}/>
//           <span className="font-bold">
//             {event.startTime} - {event.endTime}:
//           </span>

const isEventActive = (event, currentTime) => {
  const eventStartTime = new Date(`${event.date}T${event.startTime}`);
  const eventEndTime = new Date(`${event.date}T${event.endTime}`);
  return currentTime >= eventStartTime && currentTime <= eventEndTime;
};

// const currentDateFormatted = () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

export default EventList;
