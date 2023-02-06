var mongoose = require("mongoose");
var schema = mongoose.Schema;

var genreSchema = schema({
    name: String
});

var GenreModel = mongoose.model("Genre", genreSchema);

exports.getGenres =  function (callback) {
    GenreModel.find({}, callback);
}
