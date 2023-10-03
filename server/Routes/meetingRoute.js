import express from 'express'
import { sendmeeting } from '../Controllers/sendmailController.js'

const router= express.Router()


router.post("/meetinglink", sendmeeting)


export default router
