import express from 'express'
import { DashData, StudentData, deleteStudentData, getAllStudentData, getOneStudent, updatestudentData } from '../Controllers/StudentController.js'

const router=express.Router()

router.post('/Data', StudentData)
router.get('/data', getAllStudentData )
router.delete("/Data/:id",deleteStudentData )
router.get("/:id",getOneStudent)
router.put("/update/:id",updatestudentData)

router.post('/DashData',DashData)



export default router