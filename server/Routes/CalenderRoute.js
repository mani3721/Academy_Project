import express from 'express'
import { Calender, deleteCalenderData, getAllCalenderData } from '../Controllers/calender.js';



const router=express.Router()

router.post('/data', Calender )
router.get('/getdata', getAllCalenderData)
router.delete('/getdata/:id', deleteCalenderData)

export default router;
