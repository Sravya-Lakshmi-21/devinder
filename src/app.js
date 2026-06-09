const express = require("express");

const app = express();

app.use("/home",
    (req,res, next)=>{
        console.log("1st Home");
    //res.send("Hello from home1");
    next();
   
},
(req, res, next)=>{
     console.log("2nd Home");
    res.send("Hello from home2");
    next();
});

app.listen(7777,()=>{
    console.log("Server is listening");
});

