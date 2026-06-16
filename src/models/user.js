const mongoose = require("mongoose");

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

// const User = mongoose.model('User', userSchema);

// module.exports = {
//     User
// };

//or in short we can write as below
module.exports = mongoose.model('User', userSchema);