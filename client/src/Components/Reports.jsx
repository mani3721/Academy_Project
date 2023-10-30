import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./sideBar";
import AnimatedPage from "../Container/Framermotion";
import { LISTOFREPORTS } from "../constants";

const Reports = () => {
  return (
    <>
      <AnimatedPage>
        <div>
          <div>
            <NavBar />
          </div>

          <div className="flex">
            <div className="py-8">
              <SideBar />
            </div>
            <div className="px-14 border-2 border-blue-700 w-[82%] ">
              <div>
                <h1 className="font-poppins text-[26px] font-semibold">Reports</h1>
                <p>Let's Check Your Reports</p>
              </div>

              <div className="flex gap-4 py-5 border-2 border-green-700">
               {
                LISTOFREPORTS.map((list)=>(
                    <ReportList key={list.key} title={list.label}/>
                ))
               }

              </div>

              <div>

                
              </div>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};


const ReportList=({title})=>{

  return(
    <div className=" bg-lime-400">
    <h4 className="font-poppins border-b-2 border-green-600">{title}</h4>
  </div>
  )
}



export default Reports;
