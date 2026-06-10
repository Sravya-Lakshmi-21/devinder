//installed mongoose library and used to connect to our database, as in the URL we have database name "devinder" 
// if it was not there then we would be connection to cluster successfully
//using non-srv connection string

const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
       );
};

module.exports = {
    connectDB
}
