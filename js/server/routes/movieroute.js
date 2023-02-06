var MovieController = require('../controllers/movieController');

var movieroutes = function () {
    var router = require('express').Router();

    router.get('/details', MovieController.moviedetailspage);
    router.get('/', MovieController.getmovies);
    router.get('/details/:id',MovieController.getmoviebyid);
    router.get('/search/:partialtext',  MovieController.searchmoviebytitle);
    router.get('/search',  MovieController.getmovies);
    return router;
}

module.exports = movieroutes();