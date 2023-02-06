const path = 'C:/EG3779/Project';

var publicroute = function () {
    var router = require('express').Router();

    router.get('/css/*', function (req, res) {
        res.sendFile(path + req.originalUrl);
    });

    router.get('/js/*', function (req, res) {
        res.sendFile(path + req.originalUrl);
    });

    return router;
}

module.exports = publicroute();