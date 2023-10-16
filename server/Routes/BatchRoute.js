import express from 'express'
import { addBatch, deleteBatch, getBatch, getbatchbyid, updateBatch } from '../Controllers/AddBatchController.js'

const router=express.Router()

router.post('/data', addBatch)
router.get('/get', getBatch)
router.get('/get/:id', getbatchbyid)
router.put('/edit/:id', updateBatch)
router.delete('/delete/:id', deleteBatch)

export default router