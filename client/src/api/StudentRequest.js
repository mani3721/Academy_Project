import axios from "axios"
const API = axios.create({baseURL:"http://localhost:5000"})

export const StudentData=(formData)=>API.post('/student/Data', formData)

export const getAllStudentData=()=> API.get('/getstudent/data')

export const deleteStudentData=(id)=>API.delete(`/student/Data/${id}`)

export const getOneStudent = (id) => API.get(`/student/${id}`);

export const updateStudentData=(id, data)=>API.put(`/student/update/${id}`,data)

export const DashData=(dashData)=>API.post('/student/DashData', dashData)


