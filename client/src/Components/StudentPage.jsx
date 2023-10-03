import React from "react";
import NavBar from "./NavBar";
import { Studentcategories } from "../utils/data";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";

const StudentPage=()=>{

    return(
        <>
        <div className="flex">
            
       
        <div className="bg-[#fefefe] w-[20%] justify-center items-center  flex flex-col h-screen">
           
        <div className="">
           <Link to="/">
              <img src={logo} alt="" width={150} />
            </Link>
           </div>
          <div >
            

             {
                Studentcategories.map((list,i)=>(
                    <Link
                    to={`/student/${list.key}`}>
                        <div className="py-5 flex items-center  ">
                       
                       <div className="hover:bg-[#407aff]   flex items-center p-2 transition ease-in-out delay-100 rounded-lg hover:text-white">
                       <h1>{list.image}</h1>
                       <h1 className="font-poppins px-3 cursor-pointer text-[20px]">{list.name}</h1>
                       </div>
                      </div>
                    </Link>
                    
                ))
             }
          </div>
        </div>
        
        <div className="bg-[#f6f9fe] w-[80%] h-screen">

        </div>
   

        </div>
        </>
    )
}

export default StudentPage