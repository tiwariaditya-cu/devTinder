const mongoose = require ('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address "+ value);
            }
        }
    },
    age:{
        age:Number,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,

        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("gender data is not valid");
                
            }
        },
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
    },
    skills:{
        type:[String],
    },
    
},
{
        timestamps:true,
    }

);





const userModel = mongoose.model("User", userSchema);

module.exports = userModel;