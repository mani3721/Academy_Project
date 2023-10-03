import express from 'express'
import { AdminlogIn } from '../Controllers/AdminController.js';


const router=express.Router()

router.post('/login', AdminlogIn )

export default router;

