var booking = require('../models/booking');
var user = require('../models/user');
const path = require('path');

exports.viewseatspage =  function (req, res) {
    res.sendFile(path.resolve('views/viewseats.html'));
};

exports.paymentpage =  function (req, res) {
    res.sendFile(path.resolve('views/cart.html'));
};

exports.getbookingbyuserid = function(req,res) {
    booking.getBookingByUserID(req.params.id,function(err,booking){
        if(err) {
            res.status(500).send("Unable to find booking");
        } else {
            res.status(200).send(booking);
        }
    })
}

exports.getbookings = function(req,res){
    var newBooking = {
        movieID: req.query.movieID,
        date: req.query.date,
        time: req.query.time
    };

    booking.getBooking(newBooking,function (err, booking) {
        if(err) {
            res.status(500).send("Unable to find booking");
        } else {
            console.log(booking);
            res.status(200).send(booking);
        }
    })
};

    exports.addBooking = function (req, res) {
        console.log(req);
        if (req.session.cart) {
            var points = (req.session.cart.totalprice - req.session.cart.totalprice % 5) / 5;
            var totalpoints = points + req.session.user.points;

            user.updatePointsByID(req.session.user._id, totalpoints, function (err) {
                if (err) {
                    res.status(500).send("Unable to update points");
                } else {
                    booking.addBooking(req.session.user._id, req.session.cart, function (err) {
                        if (err) {
                            
                            res.status(500).send("Unable to add booking");
                        } else {
                            res.redirect("/booking/summary/user");
                        }
                    })
                }
            })

        }
    }

    exports.getLatestBooking = function (req, res) {
        booking.getNewestBookingCreated(req.session.user._id,function (err, booking) {
            if (err) {
                console.log("Fail");
                res.status(500).send("Unable to get the booking");
            } else {
                res.status(200).send(booking);
            }
        })
    }
    
    exports.bookingsummarypage =  function (req, res) {
        res.sendFile(path.resolve('views/bookingsummary.html'));
    };

    exports.getBookingSummary = function(req, res) {
        booking.getBookingByUserID(req.session.user._id, function(err, booking) {
            if (err) {
                console.log("Fail");
                res.status(500).send("Unable to get the user booking summary");
            } else {
                res.status(200).send(booking);
            }
        })
    }

    exports.checkbookingpage = function(req, res) {
        res.sendFile(path.resolve('views/checkbooking.html'));
    };