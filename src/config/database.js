//installed mongoose library and used to connect to our database, as in the URL we have database name "devinder" 
// if it was not there then we would be connection to cluster successfully
//using non-srv connection string

const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        'mongodb://myFirstProject:aKTQ1cbDW6Jfaq7C@ac-rc5ukwk-shard-00-00.qu3smby.mongodb.net:27017,ac-rc5ukwk-shard-00-01.qu3smby.mongodb.net:27017,ac-rc5ukwk-shard-00-02.qu3smby.mongodb.net:27017/?ssl=true&replicaSet=atlas-9gx2m5-shard-0&authSource=admin&appName=MyFirstProject/Devinder'
    );
};

module.exports = {
    connectDB
}
