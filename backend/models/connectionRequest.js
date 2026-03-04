import mongoose from "mongoose";
import { User } from "./userModel.js";

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    status : {
        type : String,
        enum : ["ignored", "accepted", "rejected", "interested"],
        message : `{VALUE} is not a valid status`
    }
}, {timestamps : true})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

export default ConnectionRequest;