const express = require('express');
const app = express();

var bodyParser = require("body-parser");
var db = require('./js/server/connection.js');
db.connect();

var session = require('express-session');

var aut = require('./js/server/middleware/authorize.js');
var role = require('./js/server/middleware/roles.js');



app.use(bodyParser.urlencoded({
    extended: true
}));

const hour = 1000 * 60 * 60;
app.use(session({
    name: 'user_sid',
    secret: 'authenticate',
    resave: false, //not tosend session back to store if it is not modified
    saveUninitialized: false,

    cookie: {
        secure: false,
        sameSite: true,
        maxAge: hour
    }
}));

app.use('/uploads',express.static('uploads'));
app.use('/public', express.static('public'));

app.use(express.static('js/client'));


//INCLUDES INDEX PAGE, JS AND CSS
var indexroute = require('./js/server/routes/indexroute.js');

var userroutes = require('./js/server/routes/userroute.js');
var movieroutes = require('./js/server/routes/movieroute.js');
var hallroutes = require('./js/server/routes/hallroute.js');
var theatreroutes = require('./js/server/routes/theatreroute.js');
var showtimesroutes = require('./js/server/routes/showtimesroute.js');
var cartroutes = require('./js/server/routes/cartroute.js');
var bookingroutes = require('./js/server/routes/bookingroute.js');
var ticketroutes = require('./js/server/routes/ticketroute.js');
var reviewroutes = require('./js/server/routes/reviewroute.js');
var genreroutes = require('./js/server/routes/genreroute.js');
var adminroutes = require('./js/server/routes/adminroute.js');



app.use("/",indexroute);
app.use("/user",userroutes);
app.use("/movies",movieroutes);
app.use("/halls",hallroutes);
app.use("/theatres",theatreroutes);
app.use("/showtimes",showtimesroutes);
app.use("/cart",cartroutes);
app.use("/booking",bookingroutes);
app.use("/tickets",ticketroutes);
app.use("/reviews",reviewroutes);
app.use("/genres",genreroutes);
app.use("/admin",adminroutes);


const port = 4000;
app.listen(port, function () {
    console.log("Server started at port " + port);
}); 
