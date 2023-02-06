var mongoose = require("mongoose");
var schema = mongoose.Schema;
var stSchema = schema({
    theatreID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre"
    },
    hallID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hall"
    },
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    showtimes: [
        { date: Date, time: Array }
    ]
});

var ShowtimeModel = mongoose.model("Showtime", stSchema);

exports.addShowTime = function (showtime, callback) {
    var newShowtime = new ShowtimeModel({
        theatreID: showtime.theatreID,
        hallID: showtime.hallID,
        movieID: showtime.movieID,
        showtimes: showtime.showtimes
    });
    newShowtime.save(callback);
}
exports.getShowTimes = function (callback) {
    ShowtimeModel.find({}, callback).populate('theatreID').populate('hallID').populate('movieID');
}
exports.getShowTimeById = function (id, callback) {
    ShowtimeModel.findById(id, callback);
}
exports.getShowTimesByMovieID = function (movieID, callback) {
    ShowtimeModel.find({ movieID: movieID }).populate('theatreID').populate('hallID').populate('movieID').exec(callback);
}
exports.getTimeByDate = function (date, callback) {
    ShowtimeModel.find({ 'showtimes.date': date }, callback);
}
exports.getMoviesByTheatreID = function (theatreID, callback) {
    ShowtimeModel.find({ theatreID: theatreID }).populate('theatreID').populate('hallID').populate('movieID').exec(callback);
}
exports.getMoviesIDByTheatreID = function (theatreID, movieID, callback) {
    ShowtimeModel.find({ theatreID: theatreID, movieID: movieID }).distinct('showtimes.date').exec(callback);
}

exports.getShowtimesByIDs = function (theatreID, movieID, callback) {
    ShowtimeModel.find({ theatreID: theatreID, movieID: movieID }).populate('movieID').exec(callback);
}