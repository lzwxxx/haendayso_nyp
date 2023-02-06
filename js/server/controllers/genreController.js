var genre = require('../models/genre');

exports.getgenres =  function (req, res) {
    genre.getGenres(function (err, genres) {
        if (err) {
            res.status(500).send("Unable to retrieve genres");
        } else {
            res.status(200).send(genres);

        }
    })
};