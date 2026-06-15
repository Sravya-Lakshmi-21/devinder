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

app.use(express.json());

app.post("/signup", async (req, res) => {
    //create an instance of User model
    // const user = new User({
    //     firstName: "Trishika",
    //     lastName: "A",
    //     emailId: "trishika@xxx.com",
    //     password: "trishika@123",
    //     age: 3,
    //     gender: "Female"
    // })

    //now we will be passing object from req itself through postman for now in future through frontend
    //prints undefined as if cannot read json object, so express gives us a middleware
    //that parses json object to javascript object and this can read the object from the body now
    //we will be using it in app.use
    const user = new User(req.body);

    try{
        await  user.save();
        res.send("User created successfully");
    }catch(err)
    {
        res.status(400).send("CREATE FAILED:" + err.message);
    }
    
})

//get all users from User model data
app.get("/users", async (req,res)=>{
    try{
        const userData = await User.find({});
        res.send(userData);
    }
    catch(err){
        res.status(400).send(err);
    }
    
})

//get user by email
app.get("/userByEmail", async (req, res)=>{
     try{
        const email = req.body.emailId;
        //.exec() sends null if there is no record found
        const userData = await User.findOne({ emailId: email }).exec();
        res.send(userData);
    }
    catch(err){
        res.status(400).send(err);
    }
})

//delete user by email, there are other methods also for delete we need to use acc to our requirement
app.delete("/userByEmail", async (req, res)=>{
     try{
        const email = req.body.emailId;
        //.exec() sends null if there is no record found
        const response = await User.findOneAndDelete({ emailId: email });
        res.send(response);
    }
    catch(err){
        res.status(400).send(err);
    }
})

//update a document in User by passing the id
app.patch("/updateUserById/:userId", async (req, res)=>{
    const id = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATES = ["age", "lastName", "gender", "skills"];
    const isAllowed = Object.keys(data).every(x => ALLOWED_UPDATES.includes(x));

    try {
        if (isAllowed) {
            await User.findByIdAndUpdate({ _id: id }, data, {
                runValidators: true,
            }
            );
            res.send("User updated successfully");
        }
        else {
            res.status(400).send("Cannot update these fields");
        }

    }
    catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message);
    }

})






