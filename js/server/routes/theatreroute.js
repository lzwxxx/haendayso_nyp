var TheatreController = require('../controllers/theatreController');

var theatreroutes = function () {
    var router = require('express').Router();

    router.get('/', TheatreController.gettheatres);
    // router.get('/:theatreid', TheatreController.gettheatrebyid);

    return router;
}

module.exports = theatreroutes();