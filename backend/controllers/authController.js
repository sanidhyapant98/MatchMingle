import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res)=>{
    try {
        const {firstName, lastName, email, password, gender, age, profileUrl, skills, bio} = req.body
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await User.create({firstName, lastName, email, password: hashedPassword, gender, age, profileUrl, skills, bio})
        res.status(201).send("User created successfully")
    }catch(err){
        res.status(500).send("Error : " + err.message)
    }
}

export const login = async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(404).send("User not found")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).send("Invalid Password")
        }else{
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "100d"})
            res.cookie("token", token)
            res.status(200).json({
                message : "Login successful",
                user : user
            })
        }
    }catch(err){
        res.status(500).send("Error : " + err.message)
    }
}

export const logout = async (req, res)=>{
    res.clearCookie("token")
    res.status(200).send("Logout successful")
}