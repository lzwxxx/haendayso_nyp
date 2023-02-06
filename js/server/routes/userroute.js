var UserController = require('../controllers/userController');
var mauth = require('../middleware/auth');
var validation = require('../middleware/validation');
var authorize = require('../middleware/authorize');
var role = require('../middleware/roles');

var userroutes = function () {
    var router = require('express').Router();

    router.get('/login', mauth.redirectHome, UserController.loginpage);
    router.post('/login', mauth.redirectHome,validation.validate('login'), UserController.getuserbyusername);
    router.get('/logout', mauth.redirectLogin, UserController.logout);
    router.get('/register', mauth.redirectHome, UserController.registerpage);
    
    router.post('/register', mauth.redirectHome,validation.validate('register'), UserController.register);
    // GET ACCOUNT PROFILE PAGE
    router.get('/accountprofile', mauth.redirectLogin, UserController.accountprofilepage);
    
    // GET USER DETAILS
    router.get('/details', mauth.redirectLogin, UserController.getuserdetails);

    router.get("/points", mauth.redirectLogin, UserController.getuserdetails);

    router.put("/payment", mauth.redirectLogin, UserController.updatepointsByID);

    router.put("/discount", mauth.redirectLogin, UserController.deletepointsByID);

    router.post("/editprofile", mauth.redirectLogin,validation.validate('update'), UserController.updateUserInfo);

    router.get("/admin", mauth.retrieveToken);
    

    return router;
}

module.exports = userroutes();