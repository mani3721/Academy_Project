
const EventList = ({ events, hour,currentTime  }) => {
    const eventsInHour = events.filter(
        (event) => {
          const startHour = parseInt(event.startTime.split(':')[0]);
          const endHour = parseInt(event.endTime.split(':')[0]);
          return startHour <= hour && hour < endHour;
        }
      );
    
      return (
        <ul className="pl-4">
        {eventsInHour.map((event) => (
          <li
            key={event.id}
            className={`mb-2 ${isEventActive(event, currentTime) ? 'text-green-600' : ''}`}
          >
            <span className="font-bold">
              {event.startTime} - {event.endTime}:
            </span>
            <span className="ml-2">{event.title}</span>
          </li>
        ))}
      </ul>
  
      );
  };

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