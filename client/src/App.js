
import Home from "./Container/Home";
import {Routes, Route , Navigate, useNavigate} from 'react-router-dom'
import StudentPage from "./Components/StudentPage";
import StudentDetails from "./Components/Studentlist";
import AdminLogin from "./Components/AdminLogin";
import AddStudentDetails from "./Components/AddStudentDetails";
import StudentSignIn from "./Components/StudentSignin";
import { useSelector } from "react-redux";
import PageNotFound from "./Components/PageNotFound";
import StudentLogin from "./Components/StudentLogin";
import DashBoard from "./Components/DashBoard";
import AddCard from "./Components/AddCard";
import Staff from "./Components/Staff";
import AddStaff from "./Components/AddStaff";
import AdminCoursesPage from "./Components/AdminCoursesPage";
import AddCources from "./Components/AddCources";
import Schedule from "./Components/Schedule";
import Reports from "./Components/Reports";
import Teams from "./Components/Team";
import Addbatch from "./Components/AddBatch";
import DateRangePicker from "./Components/Reports";

function App() {

  const user=useSelector((state)=>state.StudentReducer.authData)
  const Loading =useSelector((state)=>state.StudentReducer.loading)

  return (
   <div className='flex flex-col'>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<StudentLogin />} />
    <Route path="/studentpage" element={<StudentPage/>}/>
    <Route path="/adminlogin" element={<AdminLogin/>}/>
    <Route path="/category/studentlist" element={ <StudentDetails/>}/>
    <Route path="/studentlist/addstudentdetails/:id" element={ <AddStudentDetails/>}/>
    <Route path="/createstudentid" element={<StudentSignIn/>}/>
    <Route path="/category/dashboard" element={<DashBoard/>} />
    <Route path="/dashboard/card" element={<AddCard/>}/>
    <Route path="/category/staff" element={<Staff/>}/>
    <Route path="/addstaff/:id" element={<AddStaff/>}/>
    <Route path="/category/cources" element={<AdminCoursesPage/>}/>
    <Route path="/category/addcource/:id" element={<AddCources/>}/>
    <Route path="/category/schedule" element={<Schedule/>}/>
    <Route path="/category/Reports" element={<DateRangePicker/>}/>
    <Route path="/category/Teams" element={<Teams/>}/>
    <Route path="/category/addbatch" element={<Addbatch/>}/>
    <Route path="*" element={<PageNotFound/>} />
  </Routes>
   </div>
  );
}

export default App;
