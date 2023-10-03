import axios from "axios";

const API= axios.create({baseURL:"http://localhost:5000"})

export const addStaff =(formData)=>API.post("/staff/data", formData)

export const getAllStaffData=()=>API.get("/staff/getData")

export const fetchStaff=(id)=>API.get(`/staff/fetchStaff/${id}`,)

export const updateStaffData=(id, data)=>API.put(`/staff/update/${id}`, data)

export const deleteStaffData=(id)=>API.delete(`/staff/delete/${id}`)