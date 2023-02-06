
var HallController = require('../controllers/hallController');


var mauth = require('../middleware/auth');

var hallroutes = function () {
    var router = require('express').Router();

    router.get('/', mauth.redirectLogin,HallController.gethalls);
    router.get('/:id',mauth.redirectLogin, HallController.gethallbyid);
    return router;
}

module.exports = hallroutes();
