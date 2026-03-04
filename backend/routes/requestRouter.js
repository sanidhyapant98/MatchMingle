import express from "express"
import sendConnectionRequest from "../controllers/requestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", authMiddleware, sendConnectionRequest);

export default requestRouter;