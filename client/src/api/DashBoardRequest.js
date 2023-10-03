import axios from "axios";

const API= axios.create({baseURL:"http://localhost:5000"})

export const getDashBaordData=()=>API.get('/dashboard/data')

export const deleteDashCard=(id)=>API.delete(`/dashboard/data/${id}`)

export const CalenderData=(formdata)=>API.post('/calender/data', formdata)

export const fetchEvents=()=>API.get('/calender/getdata')

export const deleteEvents=(id)=>API.delete(`/calender/getdata/${id}`)