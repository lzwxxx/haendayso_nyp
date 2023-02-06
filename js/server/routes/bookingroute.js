var BookingController = require('../controllers/bookingController');
var mauth = require('../middleware/auth');

var bookingroutes = function () {
    var router = require('express').Router();

    router.get("/viewseats", mauth.redirectLogin, BookingController.viewseatspage);

    router.get('/payment', mauth.redirectLogin , BookingController.paymentpage);

    router.get("/", BookingController.getbookings);

    router.post("/addBooking", BookingController.addBooking);

    router.get("/:id",BookingController.getbookingbyuserid);

    router.get("/latest/booking",BookingController.getLatestBooking);

    router.get("/summary/user",mauth.redirectLogin, BookingController.bookingsummarypage);
    
    router.get("/check/booking",BookingController.getBookingSummary);

    router.get("/checkbooking/user",mauth.redirectLogin,BookingController.checkbookingpage);

    return router;
}

module.exports = bookingroutes();