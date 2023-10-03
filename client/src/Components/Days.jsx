import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { fetchAllBatch } from "../api/addbatchRequest";
import EventsListModel from "./EventsListModel";

const Days=({days,rowIdx, setGetmodeldata, keys, datas})=>{
  // console.log(datas,"monthssss");
//  console.log(days.format("DD-MM-YY"),"days");
//  console.log(days.format("DD-MM") < dayjs().format("DD-MM"),"dayjsssss");

 const [data, setData]=useState([])
const [openlist,setOpenList]=useState(false)

console.log(openlist,"oprnlist");

let currentDate;
 const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
currentDate = `${day}-${month}-${year}`;
console.log(currentDate);

// var middate = new Date((startdate.getTime() + enddate.getTime()) / 2);

  useEffect(()=>{
  const fetchbatch= async ()=>{

  //  const {data}= await fetchAllBatch()

  //  console.log(data,"dataaaaaa");

  const events = datas.filter(
    (evt) => {

      for (const evtDate of evt.dates) {
        const formatDate=dayjs(evtDate, 'YYYY-MM-DD').format("DD-MM-YY")
                //  console.log(formatDate,"formatDate");
        
        if ( formatDate=== days.format("DD-MM-YY")) {

          const formattedEvtDate = dayjs(evtDate, 'YYYY-MM-DD').format('DD-MM-YY');
           return formattedEvtDate
        }
       
    
      }}

   
     
  );
   

  setData(events)
  console.log(events,"events");
 
  }
 
  fetchbatch()

   },[days,datas])



 function getCurrentDayClass() {
    return days.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "text-blue-600 font-extrabold " : "";
  }

return (
    <>
    <div className=" flex flex-col font-poppins min-h-[15vh]">
      
       <div className="flex  flex-col items-center">
        
        {rowIdx==0 && <p className={`${['Sat', 'Sun'].includes(days.format('ddd')) ? 'text-red-400 font-poppins font-semibold' : 'font-poppins font-semibold'}`}>{days.format('dddd').toUpperCase()}</p>}
        
       <p className={`${['Sat', 'Sun'].includes(days.format('ddd')) ? 'text-red-500 font-poppins' : 'font-poppins'} ${getCurrentDayClass()} `}> {days.format('DD')}</p> 
       </div>

       {
        openlist && <EventsListModel datas={data} setclosemodel={()=>setOpenList(false)}/>

        }

      
     <div  className={`max-h-16    flex-col gap-2 items-center flex justify-center cursor-pointer `}>
           {
            data.slice(-1).map((evet,idx)=>(
                <div  onClick={()=>setGetmodeldata(evet, true)} className={`${['Sat','Sun'].includes(days.format('ddd')) ? 'bg-[#fdeeea] border-[#f29980] border-l-4  text-[#ee734f]' : 'border-l-4 border-[#24bcc9]' } w-[90%] bg-[#e9f4f5]  text-[#379a9c]  `}>
                 {console.log( evet,"lenth")}
                 {
                 data.length > 1 && <span onClick={(e)=>{setOpenList(!openlist) ;e.stopPropagation() }} className="relative inline-block float-right">
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-[#4338ca] rounded-r-full rounded-l-full">{data.length-1}</span>
                </span>
                 }
                  

                   <div>
                    <h1 className="text-center text-sm"> {`${evet.batchname.slice(0,20)}`}</h1>
                   </div>
                   <div className="flex gap-2 text-sm justify-center">
                   <div className="flex">
                   <h1 className="text-center"> {evet.start_time}</h1>-
                    <h1 className="text-center"> {evet.end_time}</h1>
                   </div> *
                    <div>
                    <h1 className="text-center text-sm"> {evet.staffname}</h1>
                   </div>
                  
                   </div>
                    
                  
                   


                    </div>
            ))
           }
     </div>

    
  
      
    </div>
    
    </>
)
}

export default Days