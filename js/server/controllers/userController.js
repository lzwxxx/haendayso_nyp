
var user = require('../models/user');
var jwt = require("jsonwebtoken");
var roles = require("../middleware/roles");
const path = require('path');

const { validationResult } = require('express-validator')


const config = require("config");
// const path = 'C:/EG3779/Project';

exports.loginpage = function (req, res) {
    res.sendFile(path.resolve('views/login.html'));
};

exports.getuserbyusername = function (req, res) {
    var data = req.body;
    var errs = validationResult(req);

    var errslist = [];

    errslist = errs.array();

    if (!errs.isEmpty()) {
        return res.status(500).send(errslist);

    } else {

        user.getUserByUsername(data.username, data.password, function (err, user) {
            if (err) {
                res.status(500).send("Unable to login");
            } else {
                // console.log(user);
                if (user != null) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, config.get('secret'));
                    req.session.user = user;
                    req.session.token = token;
                    return res.redirect('/');
                } else {
                    res.status(500).send("Unable to login");
                }
            }

        });
    }
};

exports.logout = function (req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }

        res.clearCookie('user');
        res.redirect('/');
    })
};

exports.registerpage = function (req, res) {
    res.sendFile(path.resolve('views/register.html'));
};

exports.register = function (req, res) {
    var data = req.body;
    // console.log(data);
    var newUser = {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        mobileno: data.mobile,
        gender: data.gender,
        dob: data.dob,
        password: data.password,
        role: roles.roles.admin
    }

    var errs = validationResult(req);

    var errslist = [];

    errslist = errs.array();

    // if (data.email != '') {
    //     user.validateUserByEmail(newUser.email, function (email) {
    //         if (email) {
    //            errs.array().push("Email exists");
    //         }
    //     });
    // }
    if (!errs.isEmpty()) {
        return res.status(500).send(errslist);

    }

    user.addUser(newUser, function (err, user) {
        if (err) {
            res.status(500).send("Unable to add account");
        } else {
            req.session.user = user;
            res.redirect('/');
        }
    })
};

// GET ACCOUNT PROFILE PAGE
exports.accountprofilepage = function (req, res) {
    res.sendFile(path.resolve('views/accountprofile.html'));
};

// GET USER DETAILS
exports.getuserdetails = function (req, res) {
    if (req.session.user)
        res.send(req.session.user);
};

exports.updatepointsByID = function (req, res) {
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
                        res.status(200).send("Booking added successfully");
                    }
                })
            }
        })

    }
};

exports.deletepointsByID = function (req, res) {
    var remainder = 0;
    if (req.session.cart) {
        var points = (req.session.cart.totalprice - req.session.cart.totalprice % 5) / 5;

        if (req.session.user.points > 0) {
            remainder = points - req.body.discountpoints;
        }

        if (remainder > 0) {
            user.updatePointsByID(req.session.user._id, remainder, function (err) {
                if (err) {
                    res.status(500).send("Unable to update points");
                } else {
                    booking.addBooking(req.session.user._id, req.session.cart, function (err) {
                        if (err) {
                            res.status(500).send("Unable to add booking");
                        } else {
                            res.status(200).send("Booking added successfully");
                        }
                    })
                }
            })
        } else {
            res.status(500).send("Unable to redeem points");
        }

    }
};

exports.getpointsbyuserid = function (req, res) {
    if (req.session.user) {
        res.status(200).send(req.session.user.points);
        console.log("success");
    } else {
        res.status(500).send("Unable to get the points of the user");
        console.log("failure");
    }
};


exports.getUserByEmail = function (req, res) {
    if (req.session.user) {
        res.status(200).send(req.session.user.points);
        console.log("success");
    } else {
        res.status(500).send("Unable to get the points of the user");
        console.log("failure");
    }
};
exports.updateUserInfo = function (req, res) {
    var newUser = {}
    newUser.fullname = req.body.fullname;
    newUser.mobileno = req.body.mobileno;

    var errs = validationResult(req);

    var errslist = [];

    errslist = errs.array();

    if (!errs.isEmpty()) {
        return res.status(500).send(errslist);
    } else {
        user.editProfile(req.session.user._id, newUser, function (err) {
            if (err) {
                res.status(500).send("Unable to edit profile");
            } else {
                res.redirect("/");
            }
        })
    }
}