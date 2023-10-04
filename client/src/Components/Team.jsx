import React from "react";
import SideBar from "./sideBar";
import NavBar from "./NavBar";
import {HiOutlineMail} from 'react-icons/hi'
import {MdDelete} from 'react-icons/md'
import { AiOutlinePlus } from "react-icons/ai";
import AnimatedPage from "../Container/Framermotion";

const Teams=()=>{

    return (
        <>
        <AnimatedPage>
        <div>
          <div>
            <NavBar/>
          </div>
         <div className="flex">
         <div>
            <SideBar/>
          </div>
         <div className="w-[83%]">
         <div className="p-5">
         <h1 className="font-poppins font-semibold text-[35px]">Team management</h1>
         </div>
          <div className=" h-[75vh] p-5  flex flex-col justify-between  ">
             

             <div className="flex justify-between">
       <div>
       <h1 className="text-3xl">Teams</h1>
           <p>Overview of all the teams within yours organization </p>
       </div>
       <div className="flex gap-2 py-2">
        <button className="flex items-center gap-2 border border-[#e5e8ec] p-2 rounded-md font-roboto"> <MdDelete/> Delete</button>
        <button className="bg-[#607d60]  rounded-md text-white flex gap-2 items-center px-2  font-roboto"> <AiOutlinePlus fontSize={20}/> Add Team</button>
       </div>
          </div>
          <div className="flex flex-col gap-3  justify-between">
          <div className="flex justify-between">
          <h1 className="text-3xl">Team Leader</h1>
         <div className="flex w-[60%] p-2 bg-white rounded-md gap-2 border items-center border-gray-400">
         <HiOutlineMail fontSize={20}/>
         <input type="text" className="w-full outline-none " placeholder="oliver.never@gmail.com" />
         </div>
         
          </div>
          <div className="flex justify-between">
          <p className="w-[40%]">You can appoint a team leader for each team, ensuring clear direction and effective leadership within yours teams</p>
           <button className="bg-[#607d60] text-white p-3 rounded-xl font-roboto flex items-center gap-1"> <HiOutlineMail fontSize={20}/> Send Invite</button>
          </div>
          </div>
          <div className="flex flex-col gap-3  justify-between">
          <div className="flex justify-between">
          <h1 className="text-3xl">Team Members</h1>
         <div className="flex w-[60%] p-2 bg-white rounded-md gap-2 border items-center border-gray-400">
         <HiOutlineMail fontSize={20}/>
         <input type="text" className="w-full outline-none " placeholder="oliver.never@gmail.com, hello.never@gmail.com, name.never@gmail.com" />
         </div>
         
          </div>
          <div className="flex justify-between">
          <p className="w-[40%]">You can appoint a team leader for each team, ensuring clear direction and effective leadership within yours teams</p>
           <button className="bg-[#607d60] text-white p-3 rounded-xl font-roboto flex items-center gap-1"> <HiOutlineMail fontSize={20}/> Send Invite</button>
          </div>
          <div className="flex justify-end gap-2 py-5 ">
            <button className="border p-2 rounded-md">Cancel</button>
            <button className="bg-[#607d60] text-white p-3 rounded-xl font-roboto ">Save Changes</button>
          </div>
          </div>
          </div>
         </div>
         </div>
          
      
        </div>
        </AnimatedPage>
     
        </>
    )
}

export default Teams