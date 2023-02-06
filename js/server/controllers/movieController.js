var movie = require('../models/movie');
const path = require('path');

exports.moviedetailspage =  function (req, res) {
    res.sendFile(path.resolve('views/moviedetails.html'));
};

exports.getmovies =  function (req, res) {
    movie.getMovies(function (err, movies) {
        if (err) {
            res.status(500).send("Unable to find movies");
        } else {
            res.status(200).send(movies);
        }
    })
};

// GET MOVIES BY PARTIAL TEXT
exports.searchmoviebytitle =  function (req, res) {
    var partialtext = req.params.partialtext;
    console.log(partialtext);
    if(partialtext ===  null || partialtext === "") {
        movie.getMovies(function (err, movies) {
            if (err) {
                res.status(500).send("Unable to find movies");
            } else {
                res.status(200).send(movies);
            }
        })
    } else {
        movie.getMovieByPartialText(partialtext, function (err, movies) {
            console.log(partialtext);
            if (err) {
                res.status(500).send("Unable to find movie");
            } else {
                res.status(200).send(movies);
            }
        })
    }
};


// GET MOVIE BY ID
exports.getmoviebyid = function (req, res) {
    var id = req.params.id;
    movie.getMovieById(id, function (err, movie) {
        if (err) {
            console.log("Error processing data");
        }
        res.send(movie);
    })
};