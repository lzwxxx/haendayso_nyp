const path = require('path');

var indexroute = function () {
    var router = require('express').Router();

    
    router.get('/', function (req, res) {
        res.sendFile(path.resolve("views/index.html"));
    });

    return router;
}

module.exports = indexroute();