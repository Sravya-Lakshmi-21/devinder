const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); 
const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
const {validateSignUp} = require("./utils/validate")
const cookieParser = require('cookie-parser');
const { authRouter } = require("./routes/authRouter");
const { userRouter } = require("./routes/userRouter");

//we need to run the server only once the database connection is successful
connectDB().then(()=>{
    console.log("Connect to DB successfully");
    app.listen(7777,()=>{
    console.log("Server is listening");
});
}).catch((err)=>{
    console.log("DB connection failed", err);
})

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, userRouter);








