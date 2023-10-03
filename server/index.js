import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import StudentData from './Routes/StudentData.js'
import AuthRoute from './Routes/AuthRoute.js'
import AdminRoute from './Routes/AdminRoute.js'
import Dashboard from './Routes/DashboardRoute.js'
import CalenderRoute from './Routes/CalenderRoute.js'
import StaffRoute from './Routes/StaffRoute.js'
import CourceRoute from './Routes/CourceRoute.js'
import batchRoute from './Routes/BatchRoute.js'
import meetingRoute from './Routes/meetingRoute.js'
import bcrypt from 'bcrypt'
import cors from 'cors'



const app=express()

//to serve

// app.use(express.static('public'))
// app.use('/images',express.static("images"))


app.use(cors())
dotenv.config()
app.use(bodyParser.json({limit:'30mb',extended:true }))

app.use(bodyParser.urlencoded({limit:'30mb',extended:true }))


mongoose.connect(process.env.MONGO_DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(()=>app.listen(process.env.PORT,()=>console.log("successss"))).catch((error) => console.log(error));





    app.use('/student', StudentData)
    app.use("/getstudent",StudentData )
    app.use("/auth", AuthRoute  )
    app.use("/admin",AdminRoute )
    app.use('/dashboard', Dashboard)
    app.use('/calender', CalenderRoute)
    app.use('/staff', StaffRoute)
    app.use('/course', CourceRoute)
    app.use('/batch', batchRoute)
    app.use('/send', meetingRoute)