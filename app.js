const express = require('express');
const connectDB = require("./src/config/database");
const app = express();
const User = require('./src/models/user');

app.use(express.json());



app.post("/signup",async (req,res)=>{

    console.log(req.body);

    const  user = new User(req.body);

    try {
        await user.save();
        res.send("user added succesfully");
        
    } catch (err) {
        res.status(400).send("error saving the user:"+err.message);
        
    }

});



app.get('/user', async(req,res)=>{
    const firstname = req.body.firstName;

    try{
        const user = await User.find({firstName:firstname});

        res.send(user);
    }catch(err){
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

