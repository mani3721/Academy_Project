import express from 'express'
import { addBatch, getBatch, getbatchbyid } from '../Controllers/AddBatchController.js'

const router=express.Router()

router.post('/data', addBatch)
router.get('/get', getBatch)
router.get('/get/:id', getbatchbyid)

export default router