const jwt = require("jsonwebtoken");
const User = require("../models/user");
const user = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        //get token from cookies
        const { token } = cookie;
        if (!token) {
            throw new Error("Invalid Token");
        }
        //decode the token by using below method and secret key
        const decodeToken = await jwt.verify(token, "DevInder@2107");
        const { _id } = decodeToken;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exist");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
};

module.exports = {
    userAuth
}