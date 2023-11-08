import React  from "react";
import logo from "../assest/logo.png";
import { MenuItem } from "../utils/data";
import { Link } from "react-router-dom";




const NavBar = () => {
  // const lastScrollTop=useRef(0)
  // const [isNavbarVisible, setIsNavBarVisible]=useState(true)
  // const handscroll=()=>{
  //     const {pageYOffset}=window
  //     if (pageYOffset>lastScrollTop.current) {
  //         setIsNavBarVisible(false)
  //     }else if(pageYOffset<lastScrollTop.current){
  //           setIsNavBarVisible(true)
  //     }
  //     lastScrollTop.current=pageYOffset
  // }

  // useEffect(()=>{
  //     Window.addEventListner(
  //         "scroll",
  //         handscroll,
  //         {passive:true}
  //     );
  //     return window.addEventListener(
  //         "scroll",handscroll
  //     )
  // },[])
  //className={`${isNavbarVisible?"visible":""}`}
  return (
   
      <nav>
     
        <div className="bg-white border-b-2 p-2 px-[3%] border-gray-300 flex justify-between items-center">
          <div className="flex justify-start items-center flex-10 gap-10">
            <Link to="/">
              <img src={logo} alt="" width={150} />
            </Link>
          </div>
          <div className="">
            <ul className="xl:flex hidden text-sm gap-10 text-center text-[#455065] cursor-pointer">
              {MenuItem.map((menu) => (
                <li className="font-medium font-poppins">{menu.name}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end text-white gap-2 ">
            <Link to={`/adminlogin`}>
              <button className="border-[#163b91] border-2 text-blue-700 transition-all ease-out rounded-lg lg:px-4 lg:py-3 lg:text-[14px] font-medium font-poppins">
                Admin Login
              </button>
            </Link>
            <Link to={`/login`}>
              <button className="bg-[#163b91] hover:bg-blue-800 transition-all ease-out rounded-lg lg:px-4 lg:py-3.5 lg:text-[14px] font-medium font-poppins">
                Student Login
              </button>
            </Link>
          </div>
          

      

        </div>
      </nav>
  
  );
};

export default NavBar;
