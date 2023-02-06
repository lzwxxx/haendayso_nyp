
var CartController = require('../controllers/cartController');
var cartroutes = function () {
    var router = require('express').Router();

    router.post("/", CartController.postcart);
    
    router.get("/", CartController.getcart);

    router.post("/remove", CartController.removecart);

    return router;
}

module.exports = cartroutes();