import React from "react";
import Days from "./Days";

export default function Month({getmodeldata,month,data,setOpenCal}) {
        
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Days days={day} keys={idx}  setOpenCall ={setOpenCal} datas={data} setGetmodeldata={getmodeldata} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}