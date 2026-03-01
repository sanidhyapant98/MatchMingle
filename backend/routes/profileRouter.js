import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getProfile, updateProfile } from '../controllers/profileController.js'

const profileRouter = express.Router()

profileRouter.get('/view', authMiddleware, getProfile)
profileRouter.patch('/update', authMiddleware, updateProfile)

export default profileRouter
