import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js"

export const authMiddleware = async (req, res, next)=>{
    try{
        const cookie = req.cookies
        const {token} = cookie
        if(!token){
            res.status(401).send("Unauthorized")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id} = decoded
        const user = await User.findById(id) 
        if(!user){
            res.status(404).send("User not found")
        }
        req.user = user
        next()
    }catch(err){
        res.status(500).send("Error : " + err.message)
    }
}