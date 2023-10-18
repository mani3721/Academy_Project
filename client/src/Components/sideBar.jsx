import React, { useState } from "react";
import { categories } from "../utils/data";
import { Link, useLocation } from "react-router-dom";
import {BiLogOut} from 'react-icons/bi'

const SideBar=({hidden})=>{
    const [isActive, setIsActive] = useState(false);
    const isActiveCall = () => {
        setIsActive(!isActive);
      };

      const pathname= useLocation()
  
    return (
        <>
          <section className='custom-scrollbar  flex w-fit flex-col justify-between  border-r border-r-dark-4 bg-dark-2  max-md:hidden '>
            <div className={`flex w-full flex-1 flex-col px-10 py-5 gap-2 ${pathname.pathname=='/category/studentlist' ? 'hidden' : 'block'}` }>
        {categories.map((category) => {

            const isActive=(pathname.pathname.includes(`/category/${category.key}`) || pathname.pathname===`/category/${category.key}`)
          return (
            <Link
              to={`/category/${category.key}`}
              key={category.key}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-[#3b5be9] text-white'} `}
            >
           <div className="flex items-center gap-3">
           <div>
             {category.image}
             </div>

             <div>
             <p className='text-light-1 font max-lg:hidden'>{category.name}</p>
             </div>
           </div>
            </Link>
          );
        })}
      </div>

      <div className={`flex items-center justify-center pr-6  gap-4 text-[#ff6e42] font-semibold   ${pathname.pathname=='/category/studentlist' ? 'hidden' : 'block'}`}>
      
      <BiLogOut/>
    <button className="">LogOut</button>
    
      </div>

        </section>
        </>
    )
}

export default SideBar