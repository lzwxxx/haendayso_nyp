var showtimes = require('../models/showtimes');

exports.getshowtimebyMovieIDandTheatreID =  function (req, res) {
    var theatreID = req.params.theatreID;
    var movieID = req.params.movieID;
    showtimes.getShowtimesByIDs(theatreID, movieID, function (err, showtimes) {
        if (err) {
            res.status(500).send("Unable to retrieve Showtimes");
        } else {
            res.status(200).send(showtimes);
        }
    })
};

exports.addshowtimes = function(req,res) {
    console.log(req.body);
    var newShowtime = {
        theatreID: req.body.theatreID,
        hallID: req.body.hallID,
        movieID: req.body.movieID,
        showtimes: req.body.showtimes
    };

    showtimes.addShowTime(newShowtime,function(err){
        if(err) {
            res.status(500).send("Error in adding showtime");
        } else {
            res.status(200).send("Successful in adding showtime");
        }
    })
}


exports.getshowtimes =  function (req, res) {
    showtimes.getShowTimes(function (err, showtimes) {
        if (err) {
            res.status(500).send("Unable to retrieve showtimes");
        } else {
            res.status(200).send(showtimes);

        }
    })
};

// GET SHOWTIMES BY MOVIEID
exports.getshowtimesbyMovieID =  function (req, res) {
    var id = req.params.movieID;
    showtimes.getShowTimesByMovieID(id, function (err, showtimes) {
        if (err) {
            res.status(500).send("Unable to find showtimes");
        } else {
            res.status(200).send(showtimes);
        }
    });
};

// GET MOVIES BY THEATREID 
exports.getmoviesbyTheatreID =  function (req, res) {
    var id = req.params.theatreid;
    showtimes.getMoviesByTheatreID(id, function (err, movies) {
        if (err) {
            res.status(500).send("Unable to find Movies");
        } else {
            res.status(200).send(movies);
        }
    });
};

// // GET MOVIEIDS BY THEATREID 
// router.get('/showtimes/moviesID/:theatreid', function (req, res) {
//     var id = req.params.theatreid;
//     showtimes.getMoviesIDByTheatreID(id, function (err, movieID) {
//         if (err) {
//             res.status(500).send("Unable to find Movies");
//         } else {
//             res.status(200).send(movieID);
//         }
//     });
// });

// GET SHOWTIME BY ID
exports.getshowtimesbyshowtimeID =  function (req, res) {
    var showtimeid = req.params.showtimeid;
    showtimes.getShowTimeById(showtimeid, function (err, showtime) {
        if (err) {
            res.status(500).send("Unable to find date");
        } else {
            res.status(200).send(showtime);
        }
    });
};