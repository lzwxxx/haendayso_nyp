var ReviewController = require('../controllers/reviewController');


var mauth = require('../middleware/auth');

var reviewroutes = function () {
    var router = require('express').Router();

    router.get('/:movieid', ReviewController.getreviewbymovieID);

    router.post('/:movieid' , ReviewController.addreview);


    return router;
}

module.exports = reviewroutes();