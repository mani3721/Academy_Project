import { BsThreeDotsVertical } from "react-icons/bs";
import rooms from "../assest/daymeeting.png";
import {RiUserVoiceFill} from 'react-icons/ri'
const EventList = ({ events, hour,currentTime,opensideBar  }) => {
    const eventsInHour = events.filter(
        (event) => {
          const startHour = parseInt(event.startTime.split(':')[0]);
          const endHour = parseInt(event.endTime.split(':')[0]);
          return startHour <= hour && hour < endHour;
        }
      );
    
      return (
        <div onClick={()=>opensideBar(true)} className="bg-[#e9f4f5] shadow-md cursor-pointer flex  items-center rounded-md h-20">
        {eventsInHour.map((event) => (
          <div
            key={event.id}
            className={`p-2 flex items-center justify-center  ${isEventActive(event, currentTime) ? 'text-green-600' : ''}`}
          >
            <div className="flex items-center gap-5 ">
             <div>
             <img src={rooms} alt="" width={50} />
             </div>
              <div>
                <div>
                   <h1 className="font-poppins">{event.title}</h1>
                </div>
                <div className="flex">
                <h1 className="font-poppins"> {event.startTime} - {event.endTime} * </h1> 
                <h1 className="font-poppins">GOBI</h1>
                  </div>
              </div>
            <div className="cursor-pointer">
            <BsThreeDotsVertical/>
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
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  export default EventList