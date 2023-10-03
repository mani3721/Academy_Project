import React from "react";

const Day=(props)=>{

    let day = props.day;
    let selected = props.selected;
    let select = props.select;

    return(
        <>
        <div
          className={
            "day" +
            (day.isToday ? " bg-sky-500 rounded-full text-white " : "") +
            (day.isCurrentMonth ? "" : " text-gray-400 opacity-0.5") +
            (day.date.isSame(selected) ? " hover:bg-blue-200" : "") +
            (day.hasEvents ? " text-blue-400" : "")
          }
          onClick={() => select(day)}
        >
          <div className="flex px-6 gap-5 justify-center py-3 font-poppins cursor-pointer ">{day.number} </div>
        </div>
        
        </>
    )
}

export default Day
