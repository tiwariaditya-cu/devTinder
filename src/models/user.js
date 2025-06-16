const mongoose = require ('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({_id:user._id},"kuchsecret",{expiresIn: "1d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid  = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}




const userModel = mongoose.model("User", userSchema);

module.exports = userModel;