var mongoose = require("mongoose");
var schema = mongoose.Schema;

var bookingSchema = schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    theatreID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre"
    },
    hallID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hall"
    },
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    ticketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    totalprice: Number,
    date: Date,
    time: String,
    seatsBooked: Array,
    bookedAt: {
        type: Date,
        default: Date.now
    }
});

var BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
    addBooking: function (userID, cart, callback) {
        var newBooking = new BookingModel({
            userID: userID,
            theatreID: cart.theatreID,
            hallID: cart.hallID,
            movieID: cart.movieID,
            ticketID: cart.ticketID,
            totalprice: cart.totalprice,
            date: cart.date,
            time: cart.time,
            seatsBooked: cart.seatsBooked
        });
        newBooking.save(callback);
    },

    //latest booking at the top
    getBookingByUserID:function(userID,callback){
        BookingModel.find({ userID: userID }).populate('userID').populate('theatreID').populate('hallID').populate('movieID').populate('ticketID').sort({bookedAt: -1}).exec(callback);
    },
    getBooking:function(booking,callback) {
        BookingModel.find({ movieID: booking.movieID, date: booking.date, time: booking.time },callback);
    },
    getNewestBookingCreated:function(userID, callback) {
        BookingModel.findOne({userID: userID}).populate('userID').populate('theatreID').populate('hallID').populate('movieID').populate('ticketID').sort({bookedAt: -1}).exec(callback);
    }




}