const validator = require('validator');

const validateSignUpData = (req)=>{
    const{firstName, lastName, emailId, password}= req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email id is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedEditFields.includes(field); // ✅ FIXED: added return
    });

    return isEditAllowed;
};


module.exports = {
    validateSignUpData,
    validateEditProfileData,
};