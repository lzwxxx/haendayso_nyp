var mongoose = require("mongoose");
var schema = mongoose.Schema;


var reviewSchema = schema({
    movieID: String,
    username: String,
    description: String,
    totalratings: Number,
    bookedAt: {
        type: Date,
        default: Date.now
    }
});

var ReviewModel = mongoose.model("Review", reviewSchema);


exports.addReview = function (review, callback) {
    var newReviews = new ReviewModel({
        movieID: review.movieID,
        username: review.username,
        description: review.description,
        totalratings: review.totalratings
    });
    newReviews.save(callback);
}

exports.getReviewsByMovieID = function (movieID, callback) {
    ReviewModel.find({ movieID: movieID}).sort({totalratings: -1, bookedAt: -1}).limit(3).exec(callback);
}