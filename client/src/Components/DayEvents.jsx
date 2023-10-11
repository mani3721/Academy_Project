import { BsThreeDotsVertical } from "react-icons/bs";
import rooms from "../assest/daymeeting.png";
import { RiUserVoiceFill } from "react-icons/ri";
const EventList = ({ events, hour, currentTime, opensideBar }) => {

  console.log(events,"eventlist");

  // const eventsInHour = events.filter((event) => {
  //   const startHour = parseInt(event.start_time.split(":")[0]);
  //   const endHour = parseInt(event.end_time.split(":")[0]);
  //   return startHour <= hour && hour < endHour ;
  // });


  const eventsInHour = events.filter((event) => {
    const startHour = parseInt(event.start_time.split(':')[0]);
    const startMinute = parseInt(event.start_time.split(':')[1]);
  
    // Calculate the end time of the event in minutes
    const eventEndTimeInMinutes = startHour * 60 + startMinute + 60; // 60-minute constraint
  
    return startHour === hour && eventEndTimeInMinutes > hour * 60; // Check if event fits in the hour
  });
  

 

  
  

console.log(eventsInHour,"eventhours");
 
  return (
    <div
      onClick={() => opensideBar(true,eventsInHour)}
      className="bg-[#e9f4f5] shadow-md cursor-pointer flex  items-center rounded-md h-20"
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
              {events.length-1} 
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
              <div className="flex">
                <h1 className="font-poppins">
                  {event.start_time} - {event.end_time} *
                </h1>
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

const currentDateFormatted = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default EventList;
