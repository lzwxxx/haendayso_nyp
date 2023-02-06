var TicketController = require('../controllers/ticketController');

var ticketroutes = function () {
    var router = require('express').Router();

    router.get('/', TicketController.gettickets);
    
    router.get('/:id', TicketController.getticketbyid);

    return router;
}

module.exports = ticketroutes();