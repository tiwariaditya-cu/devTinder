const express = require('express');
const connectDB = require("./src/config/database");
const app = express();
const User = require('./src/models/user');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('./src/utils/validation');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./src/middleware/auth');

const authRouter = require('./src/routes/auth');
const profileRouter = require('./src/routes/profile');
const requestRouter = require('./src/routes/request');

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);





connectDB()
.then(()=>{
    console.log("database cnnection esatblished");
    app.listen(3000,()=>{
    console.log("server is successfully litening on port 3000");
});
})
.catch((err)=>{
    console.error("databse is  connected");
});

