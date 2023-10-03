import axios from "axios";

const API= axios.create({baseURL:"http://localhost:5000"})

export const adminlogin=(formdata)=>API.post('/admin/login',formdata)