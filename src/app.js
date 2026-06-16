const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); 
const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUp} = require("./utils/validate")
const bcrypt = require("bcrypt")

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

    try {
        //validating user data
        validateSignUp(req);
        //extracting the values from req.body and creating an instance and saving it
        //standard way of doing instead of directly passing req body
        const { firstName, lastName, emailId, password, age, gender, skills } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        //create an instance of User model
        const user = new User({
            firstName, lastName, emailId,
            password: passwordHash,
            age, gender, skills
        });

        // Wait for model's indexes to finish. The `init()`, only then if duplicate is entered it will give error
        // function is idempotent, so don't worry about triggering an index rebuild.
        await User.init();
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("CREATE FAILED:" + err.message);
    }

})

app.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const existingUser = await User.findOne({emailId: emailId});
        if(!existingUser){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(isPasswordValid){
            res.send("Login Successful");
        }
        else{
            throw new Error("Invalid credentials");
        }
        

    }catch(err){
        res.status(400).send("ERROR:" + err.message);
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
        res.status(400).send(err.message);
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






