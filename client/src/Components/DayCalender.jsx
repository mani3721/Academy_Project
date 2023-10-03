import React, { useState } from "react";
import DayEvents from "./DayTimeline";
import DayTimeline from "./DayTimeline";

const DayCalender=()=>{
    const [events, setEvents] = useState([
        { id: 1, title: 'Meeting 1', date: '2023-09-06', startTime: '09:50', endTime: '10:00' },
        { id: 2, title: 'Lunch', date: '2023-09-06', startTime: '12:00', endTime: '13:00' },
        { id: 3, title: 'Meeting 2', date: '2023-09-07', startTime: '15:00', endTime: '16:00' },
      ]);
    
      return (
        <div className="bg-amber-500 max-h-[70vh] overflow-auto">
          <DayTimeline events={events} />
        </div>
      );
    
    
}

export default DayCalender