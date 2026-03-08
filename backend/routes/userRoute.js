import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { getConnectionRequests, viewConnections, getFeed } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/requests/received", authMiddleware, getConnectionRequests)
userRouter.get("/connections", authMiddleware, viewConnections)
userRouter.get("/feed", authMiddleware, getFeed)

export default userRouter