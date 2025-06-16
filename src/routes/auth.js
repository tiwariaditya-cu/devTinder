const express = require('express');
const { userAuth } = require('../middleware/auth');
const validateSignUpData = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
const User = require('../models/user');



authRouter.post("/signup", async (req,res)=>{
try {
    validateSignUpData(req);
    
    const {firstName, lastName, emailId, password}=req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });

    
        await user.save();
        res.send("user added succesfully");
        
    } catch (err) {
        res.status(400).send("error saving the user:"+err.message);
        
    }

});

authRouter.post('/login', async(req,res)=>{
    try{
    const{emailId, password}=req.body;

    const user = await User.findOne({emailId:emailId});

    if(!user){
        throw new Error("Please sign up first");
    }
    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid){

        const token = await user.getJWT();
        

        res.cookie("token", token);

        res.send("Login successfull");
    }else{
        throw new Error("Password id not correct");
    }
}
catch(err){
     res.status(400).send("Error"+err.message);
}

});

module.exports = authRouter;