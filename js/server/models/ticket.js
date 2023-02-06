var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ticketSchema = schema({
    type: String,
    price: Number
});

var TicketModel = mongoose.model("Ticket", ticketSchema);

exports.addTicket = function (ticket, callback) {
    var newTicket = new TicketModel({
        type: ticket.type,
        price: ticket.price
    });
    newTicket.save(callback);
}
exports.getTickets = function (callback) {
    TicketModel.find({}, callback);
}
exports.getTicketById = function (id, callback) {
    TicketModel.findById(id, callback);
}

    



