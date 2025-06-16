const express = require('express');

const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest', async (req,res)=>{

    const user = req.user;

    res.send(user.firstName + "send the connection request!");
});

module.exports = requestRouter;