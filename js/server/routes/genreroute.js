

var GenreController = require('../controllers/genreController');

var mauth = require('../middleware/auth');

var genreroutes = function () {
    var router = require('express').Router();

    router.get('/',mauth.redirectLogin, GenreController.getgenres);

    return router;
}

module.exports = genreroutes();