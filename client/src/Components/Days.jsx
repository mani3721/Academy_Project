import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import EventsListModel from "./EventsListModel";
import { SiBlockchaindotcom } from "react-icons/si";


const Days = ({ days, rowIdx, setGetmodeldata, keys, datas,setOpenCall }) => {

  const [data, setData] = useState([]);

  console.log(data,"dateeeeeeeeeee");
  const [openlist, setOpenList] = useState(false);
  // let currentDate;
  // const date = new Date();

  // let day = date.getDate();
  // let month = date.getMonth() + 1;
  // let year = date.getFullYear();

  // // This arrangement can be altered based on how we want the date's format to appear.
  // currentDate = `${day}-${month}-${year}`;


  // var middate = new Date((startdate.getTime() + enddate.getTime()) / 2);

  useEffect(() => {
    const fetchbatch = async () => {
      //  const {data}= await fetchAllBatch()

    
      // const currentDates = new Date();
      const events = datas.filter((evt) => {
        for (const evtDate of evt.dates) {
          const formatDate = dayjs(evtDate, "YYYY-MM-DD").format("DD-MM-YY");
       

          if (formatDate === days.format("DD-MM-YY")) {
            const formattedEvtDate = dayjs(evtDate, "YYYY-MM-DD").format(
              "DD-MM-YY"
            );

           
            return formattedEvtDate;
          }
        }
      });

   

      setData(events);
    };

    fetchbatch();
  }, [days, datas]);

  function getCurrentDayClass() {
    return days.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-500 text-white rounded-full px-1.5 font-extrabold "
      : "";
  }
  // function getPreviousDay() {
  //   const currentDate = dayjs();
  //   const previousDate = currentDate.subtract(1, "day");

  //   return currentDate.format("DD-MM-YY") === previousDate.format("DD-MM-YY")
  //     ? "bg-blue-500 text-white rounded-full px-1.5 font-extrabold "
  //     : "";
  // }

  // function validateDate() {
  //   let pickedDate = Date.parse("01-10-2023".replace(/-/g, " "));
  //   let todaysDate = new Date();
  //   todaysDate.setHours(0, 0, 0, 0);
  //   let dateDifference = Math.abs(Number(todaysDate) - pickedDate);
  //   //7 Days=60480000s0ms

  //   if (dateDifference > 604800000) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // const dates = ["2023-10-03", "2023-10-05", "2023-10-27", "2023-10-25"];

const checkdatesss = (event) => {
  const currentDates = dayjs(); // Get the current date using dayjs
  const results = {};

  for (const evtDate of event) {
    const formattedDate = dayjs(evtDate).format("DD-MM-YY");
    if (dayjs(evtDate).isBefore(currentDates)) {
      results[formattedDate]="zebra-stripes text-[#379a9c]"
    } else {
      results[formattedDate]='future'
    }
  }

  return results;
};

// delete checkdatesss(dates)[dayjs().format("DD-MM-YY")]

// console.log(checkdatesss(dates)[days.format("DD-MM-YY")], "checkdatesss");

  // function isDateMoreThan7DaysAgo(dateString) {
  //   // Convert the given date string to a Date object
  //   const pickedDate = new Date(dateString);
  //   const todaysDate = new Date();

  //   // Set the time to midnight for both dates to ignore the time part
  //   pickedDate.setHours(0, 0, 0, 0);
  //   todaysDate.setHours(0, 0, 0, 0);

  //   // Calculate the time difference in milliseconds
  //   const dateDifference = Math.abs(todaysDate - pickedDate);

  //   // 7 days in milliseconds
  //   const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;

  //   return dateDifference > sevenDaysInMillis;
  // }

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
    <>
      <div className=" flex shadow-sm flex-col  font-poppins min-h-[15vh]">
        <div className="flex  flex-col items-center">
          {rowIdx === 0 && (
            <p
              className={`${
                ["Sat", "Sun"].includes(days.format("ddd"))
                  ? "text-red-400 font-poppins  font-semibold"
                  : "font-poppins font-semibold"
              }`}
            >
              {days.format("dddd").toUpperCase()}
            </p>
          )}

          <p
            className={`${
              ["Sat", "Sun"].includes(days.format("ddd"))
                ? "text-red-500 font-poppins"
                : "font-poppins"
            } ${getCurrentDayClass()} `}
          >
            {" "}
            {days.format("DD")}
          </p>
        </div>

        {openlist && (
          <EventsListModel
            setcall={setOpenCall}
            datas={data}
            setclosemodel={() => setOpenList(false)}
          />
        )}

        <div
          className={`max-h-16  flex-col gap-2 items-center flex justify-center cursor-pointer `}
        >
          {data.slice(-1).map((evet, idx) => (
        
            <div
              onClick={() => setGetmodeldata(evet, true)}
              className={`${
                ["Sat", "Sun"].includes(days.format("ddd")) ? "bg-[#fdeeea] border-[#f29980] border-l-4  text-[#ee734f]" : "border-l-4 border-[#24bcc9]"
              } w-[90%] ${evet.room==="Talento" && 'bg-[#eeebfa]'} ${evet.room==='Abs' && 'bg-[#fdeeea] text-[#f07f5c]'}  shadow-md  text-[#7557d4]   ${checkdatesss(evet.dates)[days.format("DD-MM-YY")] }   `}
            >
    
              {/* {
                <div className="relative right-4 bottom-1"> 
                     <span title="Present" class="relative flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                </div>
              }
            */}
              {data.length > 1 && (
                <span
                  onClick={(e) => {
                    setOpenList(!openlist);
                    e.stopPropagation();
                  }}
                  className="relative inline-block float-right"
                >
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-[#4338ca] rounded-r-full rounded-l-full">
                    {data.length - 1}
                  </span>
                </span>
              )}

              <div className="flex items-center justify-evenly">
                {/* <SlBadge color="blue"/> */}
                <h1 className="text-center text-sm">
                  {" "}
                  {`${evet.batchname.slice(0, 20)}`}
                </h1>
              </div>
              <div className="flex gap-2 text-sm items-center justify-center">
                <div className="flex">
                  <h1 className="text-center"> {tConv24(evet.start_time)}</h1>-
                  <h1 className="text-center"> {tConv24(evet.end_time)}</h1>
                </div>{" "}
                <SiBlockchaindotcom fontSize={10}/>
                <div>
                  <h1 className="text-center text-sm"> {evet.staffname}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Days;
