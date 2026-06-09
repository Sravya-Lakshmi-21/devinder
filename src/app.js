const express = require("express");

//const {adminAuth} = require("./middleware/admin")

const app = express();

app.use("/admin", (req,res, next)=>{
        const token = "fdf";
        const isAuthorized = token == "xyz";
        console.log("token authorized");
        if(isAuthorized){
            //res.send("User data Sent");
            next();
        }
        else{
            res.status(401).send("Not AUthorized");
        }
   
});

app.get("/admin/getUserData",
    (req,res, next)=>{
        res.send("User data retrieved");
   
});
app.post("/admin/createUserData",
    (req,res, next)=>{
        res.send("User data Created");
   
});
app.delete ("/admin/deleteUserData",
    (req,res, next)=>{
        res.send("User data deleted");
   
});

app.put ("/admin/updateUserData",
    (req,res, next)=>{
        res.send("User data Updated");
   
});

app.listen(7777,()=>{
    console.log("Server is listening");
});

