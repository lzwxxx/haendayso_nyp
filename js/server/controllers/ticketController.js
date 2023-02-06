var ticket = require('../models/ticket');

exports.gettickets =  function (req, res) {
    ticket.getTickets(function (err, tickets) {
        if (err) {
            res.status(500).send("Unable to get tickets");
        } else {
            res.status(200).send(tickets);
        }
    })
};

exports.getticketbyid =  function (req, res) {
    ticket.getTicketById(req.params.id, function (err, tickets) {
        if (err) {
            res.status(500).send("Unable to get ticket");
        } else {
            res.status(200).send(tickets);
        }
    })
};