import {ConnectionRequest} from "../models/connectionRequestModel.js"
import {User} from "../models/userModel.js"

const getConnectionRequests = async (req, res)=>{
    try{
        const loggedInUserId = req.user._id
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUserId,
            status : "interested"
        }).populate("fromUserId", "firstName lastName profileUrl")
        if(!connectionRequests){
            return res.status(404).send("No connection requests found")
        }
        return res.status(200).json(connectionRequests)
    }catch(err){
        return res.status(500).send("Error : " + err.message)
    }
}

const viewConnections = async (req, res)=>{
    try{
        const loggedInUserId = req.user._id
        const connections = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUserId, status : "accepted"},
                {toUserId : loggedInUserId, status : "accepted"}
            ]
        }).populate("fromUserId", "firstName lastName profileUrl")
          .populate("toUserId", "firstName lastName profileUrl")
        if(!connections){
            return res.status(404).send("No connections found")
        }
        const data = connections.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUserId.toString()){
                return row.toUserId
            }else{
                return row.fromUserId
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).send("Error : " + err.message)
    }
}

const getFeed = async (req, res) => {
    try {
        const loggedInUser = req.user;
        /**
         * PAGINATION LOGIC
         * We get 'page' and 'limit' from query params.
         * Default to page 1 and 10 users per page.
         */
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 10 ? 10 : limit; // Cap limit to 10 for performance
        const skip = (page - 1) * limit;
        // 1. Find all connection requests that the logged-in user is involved in
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");
        // 2. We want to HIDE:
        // - Ourselves
        // - People we sent requests to
        // - People we received requests from
        // - People who are already our connections (accepted requests)
        const hideUsersFromFeed = new Set();
        hideUsersFromFeed.add(loggedInUser._id.toString());
        connectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        });
        // 3. Query the User collection for all users EXCEPT those in the hide list
        // We use $nin (not in) which is a MongoDB operator
        const users = await User.find({
            _id: { $nin: Array.from(hideUsersFromFeed) }
        })
        .select("firstName lastName profileUrl skills bio age gender") // only select public info
        .skip(skip)
        .limit(limit);
        // Edge case: help the user if they requested a page that doesn't exist
        if (users.length === 0 && page > 1) {
             return res.status(200).json({ message: "No more users to show", users: [] });
        }
        return res.status(200).json(users); 
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

export { getConnectionRequests, viewConnections, getFeed }