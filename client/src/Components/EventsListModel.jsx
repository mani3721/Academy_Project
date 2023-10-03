import React, { useState } from "react";
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineSend} from 'react-icons/ai'
import { BiTimeFive } from "react-icons/bi";
import {BsFillCalendarDateFill} from 'react-icons/bs'
import meet from '../assest/meet.png'
import rooms from '../assest/meeting.png'
import { useNavigate } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import {GrDocumentText} from 'react-icons/gr'
import { useDispatch } from "react-redux";
import { sendmeetinglink } from "../actions/MeetingAction";
import EventsModel from "./EventsModel";

const EventsListModel=({setclosemodel, datas})=>{

  const navigate= useNavigate()
  const dispatch = useDispatch();
  const [openstudents, setStudents]=useState(false)
  const [meetingLink, setMeetingLink]=useState('https://meet.google.com/tih-kfdy-vrk')

  const [handleopen, sethandleopen]=useState(false)

  console.log(meetingLink,"meeting");
  const [data, setData]=useState([])

  const displaydate=(dates)=>{
   
    let newDate= new Date(dates)
  
    let date= newDate.getDate()
    let month= newDate.getMonth()
    let year= newDate.getFullYear()
  
    return `${date}-${month}-${year}`
  }

  const totaltime=(time1,time2)=>{
    const timeDifference = Math.abs(time1 - time2);

    return timeDifference / 2
  }
 

  const sendmail=(e)=>{
    e.preventDefault()
   
    dispatch(sendmeetinglink(meetingLink)).then((res)=>{
       console.log(res,"sendail");
    })
  }

// console.log(data,"ffffffffffffffff");

    return (
        <>
        
         <div className=" perspective h-screen w-full gap-6 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-40 fixed z-50 left-0 top-0 flex justify-center items-center">
        
         <div className="page bg-[#ffffff] rounded-3xl w-[40%] h-[80vh]">
            <div className="bg-[#0d817b] rounded-t-3xl h-full">
           <div className="p-6">
            <div className="border-b border-opacity-5 p-1 flex justify-between">
               <div>
               <h1 className="text-white font-poppins"> List Of Batch</h1>
               </div>
                
               <div onClick={()=>setclosemodel(false)} className="cursor-pointer"  >
                 <AiOutlineCloseCircle fontSize={20} color="#fff" />
               </div>
            </div>

            <div  className={` flex-col gap-2 mt-10 max-h-44 overflow-auto items-center flex justify-center cursor-pointer `}>
           {
            datas.map((evet,idx)=>(
                <div onClick={()=>{sethandleopen(true); setData([evet])}}  className={` w-[90%] bg-[#e9f4f5] text-[#379a9c] rounded-md`}>
                 {console.log( evet,"lenth")}
                 {
                 data.length > 1 && <span  className="relative inline-block float-right">
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

            <div>
      
    </div>
           </div>
            </div>
          
          {/* <EventsModel/> */}
         </div>
 {
  handleopen && <div  className=" bg-[#ffffff] rounded-3xl w-[40%] h-[80vh]">
  <div className="bg-[#0d817b] rounded-t-3xl h-[45vh]">
 <div className="p-6">
  <div className="border-b border-opacity-5 p-1 flex justify-between">
     <div>
     <h1 className="text-white font-poppins"> Batch Details</h1>
     </div>
      
     <div onClick={()=>sethandleopen(false)} className="cursor-pointer"  >
       <AiOutlineCloseCircle fontSize={20} color="#fff" />
     </div>
  </div>

  <div className=" mt-2 ">
     {
      data.map((evnt)=>(
        <div className="flex flex-col gap-5"> 
         <div className="flex justify-between items-center"><div className="text-white text-lg font-poppins">{evnt.batchname}</div> <div onClick={()=>navigate('/category/addbatch')} className="cursor-pointer"><AiOutlineEdit fontSize={20} color="#fff"/></div></div>
         <div className="flex gap-2"><img src={rooms} width={23} alt="" /> <h1 className="text-white font-poppins">{evnt.room}</h1></div>
         <div className="text-white text-sm font-poppins flex items-center gap-2"><PiStudentFill fontSize={17}/> <span className="">{5} Present</span>- <span className="">{0} Absent </span> / Total= < span> {15} Students </span></div>
         <div className="text-white text-sm font-poppins flex items-center gap-2"><BsFillCalendarDateFill/> {displaydate(evnt.start_date)} to {displaydate(evnt.end_date)} </div>
         <div className="text-white text-sm font-poppins flex items-center gap-2"><BiTimeFive fontSize={17}/> {evnt.start_time}- {evnt.end_time} == {totaltime(evnt.start_time,evnt.end_time)}</div>
         
        <div className="flex justify-between items-center"> 
        <div className="flex gap-4 items-center">
        <div className="p-2 cursor-pointer text-sm text-white bg-gray-700 rounded-md bg-clip-padding backdrop-filter font-poppins backdrop-blur-sm bg-opacity-20 border flex gap-1 border-gray-100"><img width={20} src={meet}></img> Join With Google Meet  </div>

        <button onClick={sendmail} className="cursor-pointer"><AiOutlineSend color="#fff" fontSize={20}/></button>
        </div>
        
        <div className="text-white"> Live </div>
        
        </div>

          <div className=" py-3">
             <h1 className="text-[#6d9ad1] font-poppins">{data[0].students.length} Students invited</h1>
             <div className="flex  max-h-[12vh] overflow-auto mb-1 -space-x-1 flex-wrap">
           {
            data.map((student)=>(
              student.students.slice(0, openstudents?  data[0].students.length : 10).map((list)=>(
                <div class="relative inline-flex items-center justify-center w-10 h-10  bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300" title={list.label.toUpperCase()}>{list.label.charAt(0).toUpperCase()}</span>
              
              <span class="bottom-0 right-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> 
              
                </div>
              ))
      
            ))
           }
            <div className="relative cursor-pointer">
              {
                data[0].students.length>=10 &&  <a onClick={()=>setStudents(true)} className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" >{data[0].students.slice(openstudents?  data[0].students.length :10, data[0].students.length).length  }</a>
              }
           

            </div>

                    </div>
          </div>
          <div className="div">
          <div className="flex gap-1 items-center">
          <GrDocumentText/> <h1 className="font-poppins">Documents</h1>
          </div>
          </div>
       
        </div>
      ))
     }
  </div>

  <div>

</div>
 </div>
  </div>
</div>
 }
         
         </div>
        </>
    )
}

export default EventsListModel;