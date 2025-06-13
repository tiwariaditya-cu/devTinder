const express = require('express');
const connectDB = require("./src/config/database");
const app = express();
const User = require('./src/models/user');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('./src/utils/validation');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./src/middleware/auth');


app.use(express.json());
app.use(cookieParser());



app.post("/signup",async (req,res)=>{
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

app.post('/login', async(req,res)=>{
    try{
    const{emailId, password}=req.body;

    const user = await User.findOne({emailId:emailId});

    if(!user){
        throw new Error("Please sign up first");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){

        const token = await jwt.sign({_id:user._id},"kuchsecret",{expiresIn: "1d"});
        console.log(token);

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

app.get('/profile',userAuth, async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
     res.status(400).send("Error"+err.message);
}
});



app.get('/user', async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send("user not found");
        }else{
        res.send(user);
        }

    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

app.get('/feed',async (req,res)=>{

    try {

        const user = await User.find({});
        res.send(user);
        
    } catch(err){
        res.status(400).send("Something went wrong");
    }

});

app.get('/delete',async(req,res)=>{
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete( {_id: userId});
        res.send("user deleted ");


    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

app.patch('/user/:userId', async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    try {

        const ALLOWED_UPDATES = ["photoUrl","age","gender","skills"];
        const isUpdatedAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
    );
        await  User.findByIdAndUpdate({_id:userId}, data);
        res.send("User updated succesfully");
        
    } catch (err) {
        res.status(400).send("Something went wrong");
        
    }
})

connectDB()
.then(()=>{
    console.log("database cnnection esatblished");
    app.listen(3000,()=>{
    console.log("server is successfully litening on port 3000");
})

})
.catch((err)=>{
    console.error("databse is  connected");
});

