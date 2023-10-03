import axios from "axios";


const API= axios.create({baseURL:"http://localhost:5000"})

export const addbatch=(formdata)=>API.post('/batch/data', formdata)

export const fetchAllBatch=()=>API.get('/batch/get')

export const fetchbatchbyid=(id)=>API.get(`/batch/get/${id}`)