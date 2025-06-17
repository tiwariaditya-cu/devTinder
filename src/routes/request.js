const express = require('express');
const ConnectionRequest = require('../models/connectionRequest');

const { userAuth } = require('../middleware/auth');
const User = require('../models/user');


const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async(req,res)=>{

    try {

        const fromUserId = req.user._id;
        const toUserId= req.params.toUserId;
        const status = req.params.status;

        //status allowed only 

        const allowedStatus =['ignored', 'interested'];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type" + status});
        };

        const toUser = await User.findById(toUserId);

            if(!toUser){
                return res.status(404).json({message:"User not found"});
            }
        

        //if already connection exisit then

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {
                    fromUserId: toUserId, toUserId:fromUserId
                },
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).send({message: "Connection Request Already Exist"});
        }


        const connectionRequest = new ConnectionRequest(
            {
                fromUserId,
                toUserId,
                status,
            }
        );

        const data = await connectionRequest.save();
        res.json({
            message:" Connection request sent successfully",
            data,
        });


        
    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
        
    }

    

})



module.exports = requestRouter;