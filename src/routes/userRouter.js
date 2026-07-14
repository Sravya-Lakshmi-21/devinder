const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const User = require("../models/user");
const {validateEditProfileData} = require("../utils/validate")

//adding userAuth middle ware where user is authenticated
userRouter.get("/user/profile/view", userAuth, async (req, res) => {
    try {
        res.send(req.user);

    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }

});

userRouter.patch("/user/profile/edit", userAuth, async (req, res) => {
    try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

     const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


// userRouter.post("/user/sendConnectionRequest", userAuth,  async (req, res)=>{
//     const user = req.user;
//     //Sending a connection request
//     res.send(user.firstName + " sent Connection request");
// })

module.exports = {
    userRouter
}
