var mongoose = require("mongoose");
var schema = mongoose.Schema;

var hallSchema = schema({
    name: String,
    seats: Array,
    seatsAvailable: Number
});

var HallModel = mongoose.model("Hall", hallSchema);

exports.addSeats = function (callback) {
    var newSeats = new HallModel({
        // name: "Hall 7",
        // seats: [{ name: "A-1", status: "available" },
        // { name: "A-2", status: "available" },
        // { name: "A-3", status: "available" },
        // { name: "A-4", status: "available" },
        // { name: "A-5", status: "available" },
        // { name: "A-6", status: "available" },
        // { name: "B-1", status: "available" },
        // { name: "B-2", status: "available" },
        // { name: "B-3", status: "available" },
        // { name: "B-4", status: "available" },
        // { name: "B-5", status: "available" },
        // { name: "B-6", status: "available" },
        // { name: "C-1", status: "available" },
        // { name: "C-2", status: "available" },
        // { name: "C-3", status: "available" },
        // { name: "C-4", status: "available" },
        // { name: "C-5", status: "available" },
        // { name: "C-6", status: "available" }],
        // seatsAvailable: 18
    });
    newSeats.save(callback);
}

exports.getAllHalls = function (callback) {
    HallModel.find({}, callback);
}
exports.getHallByID = function (id, callback) {
    HallModel.findById(id, callback);
}