var mongoose = require("mongoose");

var database = {
    connect: function () {
        mongoose.connect(
            "mongodb://localhost:27017/haendayso", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
            function (err) { 
                if (err == null) {
                    console.log("Connected to MongoDB OK");
                    mongoose.connection;
                }
                else {
                    /// ERROR OCCURED
                    console.log("Error Connecting to MongoDB: " + err);
                }
            }
        );
    },
}
module.exports = database;