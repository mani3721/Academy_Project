import express from 'express'
import { logIn, signUp } from '../Controllers/AuthController.js'

const router= express.Router()

router.post("/signup", signUp)
router.post("/login",logIn)

export default router