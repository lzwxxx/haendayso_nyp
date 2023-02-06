var reviews = require('../models/review');
var movies = require('../models/movie')

   // GET REVIEWS BY MOVIEID - get reviews for the selected movie
exports.getreviewbymovieID =  function (req, res) {
    var movieid = req.params.movieid;
    reviews.getReviewsByMovieID(movieid, function (err, reviews) {
        if (err) {
            res.status(500).send("Unable to add reviews");
        } else {
            res.status(200).send(reviews);
        }
    });
};

exports.addreview =  function (req, res) {
    if(!req.session.user || req.session.user == null) {
        return res.status(500).send("Please Login");
    } 

    var review = {
        movieID: req.params.movieid,
        username: req.session.user.username,
        description: req.body.description,
        totalratings: req.body.totalratings
    }

    if(!review.description) {
        res.status(500).send("Please fill in the field");
        return;
    }

    if(!review.totalratings) {
        res.status(500).send("Please rate the movie");
        return;
    }



    movies.getMovieById(review.movieID,function(err,movie){
        if(err) {
            res.status(500).send("Unable to add getMovie")
        } else {
            var totalvotecount = movie.vote_count + parseInt(review.totalratings);
            reviews.addReview(review, function (err, review) {
                if(movie) {
                    movies.updateMovieById(review.movieID,{vote_count: totalvotecount},function(err){
                        if(!err) {
                            res.end();
                        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    })
                }
            }) 
        }
    })
    // ADD REVIEW
    
};