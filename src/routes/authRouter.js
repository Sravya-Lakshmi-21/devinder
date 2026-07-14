const express = require("express");
const authRouter = express.Router();
const {validateSignUp} = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");


authRouter.post("/signup", async (req, res) => {

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

authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const existingUser = await User.findOne({emailId: emailId});
        if(!existingUser){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await existingUser.verifyPassword(password);
        if(isPasswordValid){
            //user is validated then we need to create a jwt token
            const token = await existingUser.getJwtToken();
            res.cookie('token', token, {
            expires: new Date(Date.now() + 48 * 3600000), // cookie will be removed after 8 hours
            });
            res.cookie('extracookie', "test");
            res.send("Login Successful");
        }
        else{
            throw new Error("Invalid credentials");
        }
    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})

authRouter.post("/logout", async(req, res)=>{
    res.cookie('token', null,{
        expires: new Date(Date.now()),
    });
    res.send("Logged Out Successfully");

    //we can also use chainning instead of above code
    // res.cookie('token', null,{
    //     expires: new Date(Date.now()),
    // }).send("Logged Out Successfully");
})

module.exports = {
    authRouter
}
