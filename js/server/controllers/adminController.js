var movie = require('../models/movie');
const path = require('path');

exports.unauthorised = function(req,res) {
    res.sendFile(path.resolve('views/forbidden.html'));
}

exports.adminindex = function (req, res) {
    res.sendFile(path.resolve('views/adminhomepage.html'));
};

exports.addshowtimespage = function (req, res) {
    res.sendFile(path.resolve('views/addshowtimes.html'));
};

exports.updatemoviepage = function (req, res) {
    res.sendFile(path.resolve('views/updatemovie.html'));
};

exports.addmoviepage = function (req, res) {
    res.sendFile(path.resolve('views/addmovie.html'));
};

exports.updatemovie = function (req, res) {
    var newMovie = {
        genre_ids: req.body.genres,
        popularity: req.body.popularity,
        vote_count: req.body.vote_count,
        original_language: req.body.original_language,
        title: req.body.title,
        vote_average: req.body.vote_average,
        overview: req.body.overview,
        release_date: req.body.releasedate,
        runtime: req.body.runtime

    };

    

    if(req.file) {
        newMovie.poster_path = {
            contentType: req.file.mimetype,
            filename: req.file.originalname
        }
    }

    movie.updateMovieById(req.body.id, newMovie, function (err) {
        if (err) {
            res.status(500).send("Unable to update Movie");
        } else {
            res.redirect("/");
        }
    })
};

exports.addmovie = function (req, res) {
    var data = req.body;
    var newMovie = {
        genre_ids: data.genres,
        original_language: data.original_language,
        title: data.title,
        overview: data.overview,
        release_date: data.releasedate,
        runtime: data.runtime
    };

    
    if(req.file) {
        newMovie.poster_path = {
            contentType: req.file.mimetype,
            filename: req.file.originalname
        }
    }

    if (!newMovie.genre_ids || !newMovie.poster_path || !newMovie.original_language || !newMovie.title || !newMovie.overview
        || !newMovie.release_date || !newMovie.runtime) {
        res.status(500).send("Please select all fields");
        return;
    }

    movie.addMovie(newMovie, function (err) {
        if (err) {
            res.status(500).send("Unable to add Movie");
        } else {
            res.redirect("/admin/addshowtimes");
        }
    })


};


exports.getLatestCreatedMovie = function(req,res) {
    movie.getNewlyCreatedMovie(function(err,movie){
        if(err) {
            res.status(500).send("Unable to retrieve the movie");
        } else {
            res.status(200).send(movie);
        }

    })
}