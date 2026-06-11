const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  emailId: String,
  password: String,
  age: Number,
  gender: String 
});

// const User = mongoose.model('User', userSchema);

// module.exports = {
//     User
// };

//or in short we can write as below
module.exports = mongoose.model('User', userSchema);