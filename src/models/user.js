const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    lowercase: true

  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength:20
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 80
  },
  gender: {
    type: String,
    required: true,
    validate(value){
      if(!["Male", "Female", "Others"].includes(value)){
        throw new error ("Please enter valid gender");
      }
    }
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