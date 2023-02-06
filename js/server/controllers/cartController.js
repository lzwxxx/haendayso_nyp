exports.postcart = function (req, res) {
    var data = "";
    if (!req.body.cart) {
        if (!req.body.theatreID || !req.body.hallID || !req.body.date || !req.body.time) {
            res.status(500).send("Please select all fields");
            return;
        }
        data = req.body;
        req.session.cart = data;
        res.send(req.session.cart);
    } else {
        data = JSON.parse(req.body.cart);
        req.session.cart = data;
        res.redirect("/booking/viewseats");
    }




};

exports.getcart = function (req, res) {
    if (req.session.cart) {
        res.send(req.session.cart);
    } else {
        res.send("There are no items in the cart");
    }
};

exports.removecart = function (req, res) {
    if (req.session.cart) {
        req.session.cart = "";
        res.send(req.session.cart);
    } else {
        res.send("There are no items in the cart");
    }
};