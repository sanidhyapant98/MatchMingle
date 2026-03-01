import { User } from "../models/userModel.js"

export const getProfile = async (req, res)=>{
    try{
        const user = req.user
        res.status(200).send(user)
    }catch(err){
        res.status(400).send("Error : " + err.message)
    }
}

export const updateProfile = async (req, res)=>{
    try{
        const allowedUpdateFields = ["firstName", "lastName", "age", "gender", "skills", "profileUrl", "bio"]
        const isUpdateAllowed = Object.keys(req.body).every((field) => 
            allowedUpdateFields.includes(field)
        )
        if(!isUpdateAllowed){
            throw new Error("Update not allowed for these fields")
        }
        const loggedInUser = req.user
        Object.keys(req.body).forEach((field) => (loggedInUser[field] = req.body[field]))
        await loggedInUser.save()
        res.status(200).send({
            message: "Profile updated successfully",
            data: loggedInUser
        })
    }catch(err){
        res.status(400).send("Error : " + err.message)
    }
}