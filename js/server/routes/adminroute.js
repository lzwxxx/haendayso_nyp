var multer = require("multer");

var AdminController = require('../controllers/adminController');
var authorize = require('../middleware/authorize');
var role = require('../middleware/roles');

var mauth = require('../middleware/auth');

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads'); // set the destination
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname); // set the file name and extension
    }
});

var upload = multer({ storage: storage, fileFilter: imageFilter });

var adminroutes = function () {
    var router = require('express').Router();

    router.get("/",  mauth.redirectLogin,authorize(role.roles.admin) ,AdminController.adminindex);

    router.get("/unathorised", mauth.redirectLogin , AdminController.unauthorised);

    router.get("/updatemovie", mauth.redirectLogin,authorize(role.roles.admin),AdminController.updatemoviepage);

    router.post("/updatemovie", mauth.redirectLogin,authorize(role.roles.admin), upload.single('file'), AdminController.updatemovie);

    router.post("/addmovie", mauth.redirectLogin,authorize(role.roles.admin),upload.single('file'), AdminController.addmovie);

    router.get("/addmovie", mauth.redirectLogin,authorize(role.roles.admin), AdminController.addmoviepage);

    router.get("/addshowtimes", mauth.redirectLogin,authorize(role.roles.admin), AdminController.addshowtimespage);

    router.get("/movies/newlyadded",mauth.redirectLogin, authorize(role.roles.admin), AdminController.getLatestCreatedMovie);

    return router;
}

module.exports = adminroutes();