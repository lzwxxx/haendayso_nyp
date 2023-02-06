var theatres = require('../models/theatre');

exports.gettheatres =  function (req, res) {
    theatres.getTheatres(function (err, theatres) {
        if (err) {
            res.status(500).send("Unable to find threatres");
        } else {
            res.status(200).send(theatres);
        }
    })
};


