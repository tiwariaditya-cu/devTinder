const express = require('express');
const { userAuth }= require('../middleware/auth');
const {validateEditProfileData} = require('../utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/user');



const profileRouter = express.Router();

profileRouter.get('/profile',userAuth, async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
     res.status(400).send("Error"+err.message);
}
});

profileRouter.get('/profile/view',userAuth, async (req,res)=>{
    try {
        const user = req.user;
        res.send(user);
        
    } catch (err) {
        res.status(400).send("Error"+err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        console.log(loggedInUser);

        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        res.send(`${loggedInUser.firstName}, your profile is updated sucessfully`);
        await loggedInUser.save();
        
    } catch (err) {

        res.status(400).send("Error"+err.message);
        
    }
});

profileRouter.patch("/profile/password", userAuth, async(req,res)=>{

    try {

        const{oldPassword, newPassword} = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

    // Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    if(!validator.isStrongPassword(newPassword)){
         return res.status(400).json({
        message: "New password is not strong enough. It must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
      });
    }

    // Hash new password and save
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(400).send("Error"+err.message);
    }
})


module.exports = profileRouter;