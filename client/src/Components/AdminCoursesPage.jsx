import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./sideBar";
import AnimatedPage from "../Container/Framermotion";
import Card from "./Card";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { courcepublish, fetchAllCourceData } from "../api/CourceRequest";
import { HiMegaphone } from "react-icons/hi2";

const AdminCoursesPage = () => {
  const navigate = useNavigate();
  const [selectedID, setSelected] = useState([]);
  const [getCall, setgetCall] = useState();
  const [Loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const setSelectedID = (event, id) => {
    var updatedList = [...selectedID];
    if (event.target.checked) {
      updatedList = [...selectedID, id];
    } else {
      updatedList.splice(selectedID.indexOf(id), 1);
    }
    setSelected(updatedList);
  };
  const [data, setData] = useState([]);
  const [activeTab, setActiveTabs] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("");
  const List = [
    {
      id: 0,
      title: "All",
      key: "All",
    },
    {
      id: 1,
      title: "Published",
      key: "publish",
    },
    {
      id: 2,
      title: "Draft",
      key: "draft",
    },
  ];

  const handleTabs = (title) => {
    setActiveTabs(title);
  };

  useEffect(() => {
    const fetAllCource = async () => {
      const { data } = await fetchAllCourceData();
      const result = data.filter((list) => {
        return list.title.toLowerCase().includes(search || selectedCategory);
      });

      setData(result);
    };

    fetAllCource();
  }, [getCall, search, selectedCategory]);

  const handlepublish = async () => {
    setLoading(true);

    await courcepublish(selectedID).then((res) => {
      setgetCall(res);
      setLoading(false);
      setSelected([]);
    });
  };
  return (
    <>
      <AnimatedPage>
        <div>
          <div>
            <NavBar />
          </div>
          <div className="flex ">
            <div className="py-8">
              <SideBar />
            </div>
            <div className=" flex flex-col justify-between w-[84%]">
              <div className="flex justify-center mr-[8%]  items-center">
                <h1 className="text-[30px] font-poppins font-semibold">
                  Courses
                </h1>
              </div>
              <div className="flex items-center  cursor-pointer justify-between">
                <div className="px-5 cursor-pointer">
                  <label
                    htmlFor=""
                    className="opacity-0.5 font-roboto text-gray-400"
                  >
                    Sort By:
                  </label>
                  <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name=""
                    id=""
                    className="px-1 font-poppins text-[#3d4b5f] outline-none "
                  >
                    <option value="" selected disabled>
                      All Categories
                    </option>
                    <option value="Full Stack Development">
                      Full Stack Development
                    </option>
                    <option value="Backend Development">
                      Back End Development
                    </option>
                    <option value="Front End Developer">
                      Front End Developer
                    </option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="App Development">App Development</option>
                  </select>
                </div>

                <div className="flex  gap-5">
                  {List.map((tabs) => (
                    <div>
                      <div
                        onClick={() => handleTabs(tabs.key)}
                        className={
                          tabs.key === activeTab
                            ? " transition delay-150 duration-500 ease-in-out border-b-2  border-[#ff3366]"
                            : ""
                        }
                      >
                        <h1 className="font-poppins text-[20px] ">
                          {tabs.title}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center p-3 w-[25rem]  bg-[#f7f7ff] rounded-2xl">
                  <BiSearch fontSize={25} />
                  <input
                    type="text"
                    className="bg-transparent outline-none w-[100%] px-2 placeholder:font-poppins"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              {!data.length && (
                <div className="flex h-[50vh] justify-center items-center">
                  <div
                    class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                  </div>
                  <div
                    class="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                  </div>
                </div>
              )}
              <div className="flex justify-start">
                <div className="flex justify-start flex-wrap max-h-[65vh] overflow-auto gap-[55px]">
                  {data.map((item) => (
                    <div
                      className={`${
                        item.status === activeTab ||
                        item.activeTap === activeTab
                          ? "block"
                          : "hidden"
                      } `}
                    >
                      {" "}
                      <Card
                        loading={Loading}
                        key={item.id}
                        item={item}
                        activeTab={activeTab}
                        setCall={setgetCall}
                        handleChange={setSelectedID}
                      />{" "}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className={`flex justify-between items-center `}>
                  <div className="flex gap-5 items-center">
                    <div
                      className={`${
                        activeTab === "draft" && selectedID?.length
                          ? "block font-poppins text-[18px]"
                          : "hidden"
                      }`}
                    >
                      {selectedID?.length} Selected
                    </div>
                    <div
                      className={`${
                        activeTab === "draft" && selectedID?.length
                          ? " font-poppins text-[18px] flex items-center"
                          : "hidden"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="h-4 w-4"
                      />
                      <label htmlFor="" className="px-2">
                        Select All
                      </label>
                    </div>
                  </div>
                  <div
                    onClick={handlepublish}
                    className={`${
                      activeTab === "draft" && selectedID?.length
                        ? "flex items-center gap-2 font-roboto text-[20px] p-2 bg-[#1b66c9] text-white rounded-md cursor-pointer"
                        : "hidden"
                    }`}
                  >
                    {Loading ? (
                      <div
                        className="flex h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      ></div>
                    ) : (
                      <>
                        <HiMegaphone />
                      </>
                    )}
                    {Loading ? "Loading..." : "Publish"}
                  </div>
                  <div
                    onClick={() => navigate("/category/addcource/add")}
                    className="bg-[#ff3366] flex float-right  p-5 cursor-pointer items-center rounded-full "
                  >
                    <AiOutlinePlus style={{ color: "#fff" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default AdminCoursesPage;
