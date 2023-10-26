import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./sideBar";
import AnimatedPage from "../Container/Framermotion";

const Reports = () => {
  
  return (
    <>
    <AnimatedPage>
    <div>
      <div>
      <NavBar/>
      </div>

      <div className="py-8">
         <SideBar/>
      </div>
    </div>

    </AnimatedPage>

 
    </>
  );
};

export default Reports;
