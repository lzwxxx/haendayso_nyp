var seating = require('../models/hall');

exports.gethalls =  function (req, res) {
    seating.getAllHalls(function (err, halls) {
        if (err) {
            res.status(500).send("Unable to find halls");
        } else {
            res.status(200).send(halls);
        }
    })
};

// GET HALL BY ID
exports.gethallbyid =  function (req, res) {
    seating.getHallByID(req.params.id, function (err, hall) {
        if (err) {
            res.status(500).send("Unable to find hall");
        } else {
            res.status(200).send(hall);
        }
    })
};

