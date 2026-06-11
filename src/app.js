const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); 
const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const User = require("./models/user");

//we need to run the server only once the database connection is successful
connectDB().then(()=>{
    console.log("Connect to DB successfully");
    app.listen(7777,()=>{
    console.log("Server is listening");
});
}).catch((err)=>{
    console.log("DB connection failed", err);
})

app.post("/signup", async (req, res) => {
    //create an instance of User model
    const user = new User({
        "firstName": "Sravya", // String is shorthand for {type: String}
        "lastName": "Lakshmi",
        "emailId": "John.doe@xxx.com",
        "password": "John@123",
        "age": 30,
        "gender": "Female"
    })

    try{
        await  user.save();
        res.send("User created successfully");
    }catch(err)
    {
        res.status(400).send("Error while creating User");
    }
    
})





