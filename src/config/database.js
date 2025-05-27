// const uri = mongodb+srv://adityatiwari0808:o7lyz4VXKt81xfS7@devtinder.mvbsxrl.mongodb.net/

const mongoose = require('mongoose')

const connectDB = async()=>{

await mongoose.connect("mongodb+srv://adityatiwari0808:o7lyz4VXKt81xfS7@devtinder.mvbsxrl.mongodb.net/devTinder");
};


module.exports = connectDB;