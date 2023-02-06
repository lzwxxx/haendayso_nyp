module.exports = authorize;
const expressJwt = require('express-jwt');
var jwt = require("jsonwebtoken");
var config = require('config');

// CHECKS IF THE USER IS AUTHORISED TO ENTER THE PAGE
function authorize(role) {
    var roles = [];

    roles.push(role);
    
    if (typeof role === 'string') {
        roles.push(role);
    }

    return [
        (req, res, next) => {
            var decoded = jwt.verify(req.session.token, config.get("secret"));
            if (roles[0] != decoded.role) {
                return res.redirect('/admin/unathorised'); 
            } else {
                next(); 
            }
        }
    ];
}