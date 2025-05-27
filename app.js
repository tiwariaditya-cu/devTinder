const express = require('express');
const connectDB = require("./src/config/database");
const app = express();
const User = require('./src/models/user');

app.post("/signup",async (req,res)=>{

    const  user = new User({
        firstName:"Aditya",
        lastName:"Tiwari",
        emailId:"adityatiwari0808@gmail.com",
        password:"adi@0802"


    });

    await user.save();
    res.send("user addded succesfylly");

})







connectDB()
.then(()=>{
    console.log("database cnnection esatblished");
    app.listen(7777,()=>{
    console.log("server is successfully litening on port 7777");
})

})
.catch((err)=>{
    console.error("databse is not connected");
});

