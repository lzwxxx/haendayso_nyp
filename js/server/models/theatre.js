var mongoose = require("mongoose");
var schema = mongoose.Schema;

var theatreSchema = schema({
    name: String,
    address: String
});

var TheatreModel = mongoose.model("Theatre", theatreSchema);

exports.getTheatres = function (callback) {
    TheatreModel.find({}, callback);
}