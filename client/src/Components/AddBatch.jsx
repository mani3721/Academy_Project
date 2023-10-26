import React, { useEffect, useState } from "react";
import AnimatedPage from "../Container/Framermotion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { getAllStudentData } from "../api/StudentRequest";
import { addbatch, updateBatch } from "../actions/addbatchAction";
import { fetchbatchbyid } from "../api/addbatchRequest";
const Addbatch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const [studentsList, setStudentList] = useState("");

  console.log(studentsList,"studenttttt");

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState({
    batchname: "",
    room: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    students: "",
    coursename: "",
    batchtype: "",
    staffname: "",
    remarks: "",
    status: "",
  });

  console.log(data, "data");
  const Loading = useSelector((state) => state.StudentReducer.loading);
  useEffect(() => {
    const fetcAllStudentData = async () => {
         const { data } = await getAllStudentData();

      let studentsdata = [];
      data.map((list) => {
        studentsdata.push({ value: list._id, label: list.name });
      });

      setSelectedOptions(studentsdata);
    };

    fetcAllStudentData();
  }, []);

  const convertdate = (data) => {
    let date = new Date(data);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const getbatch = async () => {
      if (params.id == "add") {
      } else {
        const { data } = await fetchbatchbyid(params.id);

        let startime = convertdate(data.start_date);


        console.log(startime,"startdate");

        let endtime = convertdate(data.end_date);

        setData({ ...data, start_date: startime, end_date: endtime });

        setStudentList(data.students);
      }
    };

    getbatch();
  }, [params.id]);

  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  function getDatesBetween(startDate, endDate) {
    const currentDate = new Date(startDate.getTime());
    const dates = [];

    while (currentDate <= endDate) {
      dates.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  // const date1 = new Date('2023-01-10');
  // const date2 = new Date('2023-01-20');

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let allDates = getDatesBetween(
      new Date(data.start_date),
      new Date(data.end_date)
    );

    if (params.id == "add") {
      await dispatch(addbatch({ ...data, dates: allDates,  students: studentsList })).then((res) => {
        res._id && navigate("/category/Schedule");
      });
    } else {
      await dispatch(updateBatch(params.id, { ...data, dates: allDates,   students: studentsList })).then(
        (res) => {
          res._id && navigate("/category/Schedule");
        }
      );
    }
  };

  return (
    <>
      <AnimatedPage>
        <div className="bg-[#f2f2f4] flex justify-center w-screen h-screen items-center">
          <div className="bg-white py-5 rounded-xl shadow-lg flex-col gap-10 flex justify-center items-center w-[80%] h-[90vh]">
            <div className="flex justify-start w-[70%] ">
              <h1 className="font-poppins text-[35px]"> Create New Batch </h1>
            </div>
            <div className="flex w-[70%] justify-between">
              <div className="w-[40%] ">
                <div className="flex gap-7 flex-col">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-poppins">
                      Batch Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter batch name"
                      name="batchname"
                      onChange={handleChange}
                      value={data.batchname}
                      className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-poppins">
                      Room Name
                    </label>
                    <select
                      name="room"
                      onChange={handleChange}
                      value={data.room}
                      required
                      className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                    >
                      <option
                        value=""
                        selected
                        disabled
                        hidden
                        className="text-slate-300"
                      >
                        Choose room
                      </option>
                      <option value="Talento">Talento</option>
                      <option value="Abs">ABS</option>
                    </select>
                  </div>

                  <div className="flex justify-between  ">
                    <div className="flex flex-col">
                      <label htmlFor="" className="font-poppins">
                        Start Date
                      </label>
                      <input
                        name="start_date"
                        onChange={handleChange}
                        value={data.start_date}
                        type="date"
                        className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="font-poppins">
                        End Date
                      </label>
                      <input
                        name="end_date"
                        onChange={handleChange}
                        value={data.end_date}
                        type="date"
                        className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex flex-col">
                      <label htmlFor="" className="font-poppins">
                        Start Time
                      </label>
                      <input
                        name="start_time"
                        onChange={handleChange}
                        value={data.start_time}
                        type="time"
                        className="placeholder:text-slate-300 text-sm font-poppins w-[10rem] rounded-md p-3 border-2 border-gray-200 outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="font-poppins">
                        End Time
                      </label>
                      <input
                        name="end_time"
                        onChange={handleChange}
                        value={data.end_time}
                        type="time"
                        className="placeholder:text-slate-300 text-sm font-poppins w-[10rem] rounded-md p-3 border-2 border-gray-200 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="gap-7 flex flex-col w-[45%]">
                <div className="flex flex-col ">
                  <label htmlFor="" className="font-poppins">
                    Students
                  </label>
                  <Select
                    name="students"
                    options={selectedOptions}
                    placeholder="Enter student name or email"
                    value={studentsList}
                    onChange={setStudentList}
                    isSearchable={true}
                    isMulti
                    className="placeholder:text-slate-300 text-sm font-poppins  rounded-md  border-2 border-gray-200 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-poppins">
                    Course Name
                  </label>
                  <select
                    name="coursename"
                    value={data.coursename}
                    onChange={handleChange}
                    required
                    className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                  >
                    <option value="" selected disabled hidden>
                      Choose Courses
                    </option>
                    <option value="Full Stack Developer">
                      Full Stack Developers
                    </option>
                    <option value="Front End Developer">
                      Front End Developers
                    </option>
                    <option value="Back End Developer">
                      Back End Developers
                    </option>
                    <option value="UI/UX">UI/UX Designers</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col w-[55%]">
                    <label htmlFor="" className="font-poppins">
                      Staff Name
                    </label>
                    <select
                      value={data.staffname}
                      onChange={handleChange}
                      required
                      name="staffname"
                      className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                    >
                      <option
                        value=""
                        selected
                        disabled
                        hidden
                        className="text-slate-300"
                      >
                        Choose staff
                      </option>
                      <option value="GOBI">GOPI</option>
                      <option value="LATHA">LATHA</option>
                      <option value="JABA">JABA</option>
                    </select>
                  </div>
                  <div>
                    <div className="flex flex-col ">
                      <label htmlFor="" className="font-poppins">
                        Batch Type
                      </label>
                      <select
                        value={data.batchtype}
                        onChange={handleChange}
                        required
                        name="batchtype"
                        className="placeholder:text-slate-300 text-sm font-poppins  rounded-md p-3 border-2 border-gray-200 outline-none"
                      >
                        <option
                          value=""
                          selected
                          disabled
                          hidden
                          className="text-slate-300"
                        >
                          Choose type
                        </option>
                        <option value="Sunday">Sunday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Workday">Workday</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className="font-poppins">
                    remarks
                  </label>
                  <textarea
                    value={data.remarks}
                    onChange={handleChange}
                    name="remarks"
                    rows="2"
                    className="outline-none p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-between p-3 w-[73%] items-center gap-4">
              <div
                onClick={() => navigate("/category/Schedule")}
                className=" text-[20px] border-2 text-[#17273a] border-gray-500 p-2 rounded-md"
              >
                <button className="px-4 font-poppins">Cancel</button>
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-8 py-3 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                {Loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {Loading
                  ? "Loading..."
                  : params.id == "add"
                  ? "Create Batch"
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Addbatch;
