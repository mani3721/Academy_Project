import express from 'express'
import { StaffData, deleteStaff, fetchStaffData, getAllStaffDatas, updateStaffData } from '../Controllers/StaffController.js'


const router=express.Router()


router.post('/data',StaffData )
router.get('/getData', getAllStaffDatas)
router.get('/fetchStaff/:id', fetchStaffData)
router.put('/update/:id', updateStaffData)
router.delete('/delete/:id', deleteStaff)

export default router