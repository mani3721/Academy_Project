import axios from "axios";


const API=axios.create({baseURL:"http://localhost:5000"})

export const addcource=(formdata)=>API.post('/course/data', formdata)

export const fetchAllCourceData=()=>API.get('/course/get')

export const deleteCourses=(id)=>API.delete(`/course/delete/${id}`)

export const draftCourses=(id)=>API.put(`/course/draft/${id}`)

export const courcepublish=(id)=>API.put(`/course/publish`,id)

export const getidbydata=(id)=>API.get(`/course/getdata/${id}`)

export const editcourcedata=(id, data)=>API.put(`/course/edit/${id}`, data)