var ShowtimesController = require('../controllers/showtimesController');

var showtimesroutes = function () {
    var router = require('express').Router();

    router.get('/theatreID/movieID/:theatreID/:movieID', ShowtimesController.getshowtimebyMovieIDandTheatreID);
    
    
    router.get('/', ShowtimesController.getshowtimes);
    
    // GET SHOWTIMES BY MOVIEID
    router.get('/movie/:movieID', ShowtimesController.getshowtimesbyMovieID);
    
    // GET MOVIES BY THEATREID 
    router.get('/:theatreid', ShowtimesController.getmoviesbyTheatreID);
    
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

    router.post('/addshowtime/date/time',ShowtimesController.addshowtimes);
    
    // GET SHOWTIME BY ID
    router.get('/user/showtimes/time/:showtimeid', ShowtimesController.getshowtimesbyshowtimeID);
    
    return router;
}

module.exports = showtimesroutes();

