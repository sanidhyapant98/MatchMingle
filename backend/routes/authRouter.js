import express from 'express'
import { signup, login } from '../controllers/authController.js'
import { validateSignup } from '../utils/validations.js'

export const authRouter = express.Router()

authRouter.post('/signup', validateSignup, signup)
authRouter.post('/login', login)