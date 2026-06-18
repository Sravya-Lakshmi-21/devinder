const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:4,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
   lowercase: true

  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    lowercase: true
  },
  skills: {
    type: [String],
  }
}, { timestamps: true });

userSchema.methods.verifyPassword = async function (passwordInputByUser){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}

userSchema.methods.getJwtToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: this._id.valueOf() }, "DevInder@2107", {
    expiresIn: '7d'
  });
  return token;
}

// const User = mongoose.model('User', userSchema);

// module.exports = {
//     User
// };

//or in short we can write as below
module.exports = mongoose.model('User', userSchema);