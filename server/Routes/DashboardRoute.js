import express from 'express'
import { DeleteDashBoardData, getAllDashBoardData } from '../Controllers/Dashboard.js'

const router= express.Router()


router.get("/data", getAllDashBoardData)
router.delete("/data/:id", DeleteDashBoardData)

export default router
