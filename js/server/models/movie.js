var mongoose = require("mongoose");
var schema = mongoose.Schema;

var movieSchema = schema({
    genre_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    popularity: Number,
    vote_count: Number,
    poster_path: {
        contentType: String,
        filename: String,
    },
    original_language: String,
    title: String,
    vote_average: Number,
    overview: String,
    release_date: Date,
    runtime: Number

});

var MovieModel = mongoose.model("Movie", movieSchema);

exports.addMovie = function (movieArray, callback) {
    var newMovie = new MovieModel({
        genre_ids: movieArray.genre_ids,
        popularity: 0,
        vote_count: 0,
        poster_path: {
            contentType: movieArray.poster_path.contentType,
            filename: movieArray.poster_path.filename
        },
        backdrop_path: 0,
        original_language: movieArray.original_language,
        title: movieArray.title,
        vote_average: 0,
        overview: movieArray.overview,
        release_date: movieArray.release_date,
        runtime: movieArray.runtime
    });
    newMovie.save(callback);


}
exports.getMovies = function (callback) {
    MovieModel.find({}, callback);
}
exports.getMovieById = function (id, callback) {
    MovieModel.findById(id, callback);
}

exports.getMovieByPartialText = function (partialtext, callback) {
    MovieModel.find({ title: { $regex: partialtext, $options: "i" } }, callback);
}
exports.updateMovieById = function (id, movie, callback) {
    MovieModel.updateMany({ _id: id }, movie, callback);
}


exports.getNewlyCreatedMovie = function(callback) {
    MovieModel.find({}).sort({_id: -1}).limit(1).exec(callback);
}

