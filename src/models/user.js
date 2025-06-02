const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
    },
    age:{
        age:Number,
    },
    password:{
        type:String,
    },
    gender:{
        type:String,
    },
});





const userModel = mongoose.model("User", userSchema);

module.exports = userModel;