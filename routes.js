// var request = require('request');
var bodyParser = require("body-parser");

var db = require('./js/server/connection.js');
db.connect();

var session = require('express-session')

var multer = require("multer");
var path = require('path');
var fs = require('fs');



const hour = 1000 * 60 * 60;
var routes = function () {
    var router = require('express').Router();
    // router.use(bodyParser.urlencoded({
    //     extended: true
    // }));



    // router.use(session({
    //     name: 'user_sid',
    //     secret: 'authenticate',
    //     resave: false, //not tosend session back to store if it is not modified
    //     saveUninitialized: false,

    //     cookie: {
    //         secure: false,
    //         sameSite: true,
    //         maxAge: hour
    //     }
    // }));

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

    router.get("/admin/updatemovie", function (req, res) {
        res.sendFile(__dirname + "/views/updatemovie.html");
    });

    router.put("/admin/updatemovie", upload.single('file'), function (req, res) {
        var newMovie = {
            genre_ids: req.body.genres,
            popularity: req.body.popularity,
            vote_count: req.body.vote_count,
            poster_path: {
                contentType: req.file.mimetype,
                filename: req.file.originalname
            },
            original_language: req.body.original_language,
            title: req.body.title,
            vote_average: req.body.vote_average,
            overview: req.body.overview,
            release_date: req.body.releasedate,
            runtime: req.body.runtime

        };
        movie.updateMovieById(req.body.id, newMovie, function (err) {
            if (err) {
                res.status(500).send("Unable to update Movie");
            } else {
                res.redirect("/admin");
            }
        })
    });

    router.post("/admin/addmovie", upload.single('file'), function (req, res) {
        var data = req.body;
        var newMovie = {
            genre_ids: data.genres,
            poster_path: {
                contentType: req.file.mimetype,
                filename: req.file.originalname
            },
            original_language: data.original_language,
            title: data.title,
            overview: data.overview,
            release_date: data.releasedate,
            runtime: data.runtime
        };

        movie.addMovie(newMovie, function (err) {
            if (err) {
                res.status(500).send("Unable to add Movie");
            } else {
                res.redirect("/admin");
            }
        })


    })

    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/index.html");

    });

    router.get('/css/*', function (req, res) {
        res.sendFile(__dirname + req.originalUrl);
    });

    router.get('/js/*', function (req, res) {
        res.sendFile(__dirname + req.originalUrl);
    });

    

    router.get('/login', redirectHome, function (req, res) {
        res.sendFile(__dirname + "/views/login.html");
    });

    router.post('/login', redirectHome, function (req, res) {
        var data = req.body;
        user.getUserByUsername(data.username, data.password, function (err, user) {
            if (err) {
                res.status(500).send("Unable to login");
            } else {
                if (user != null) {
                    req.session.user = user[0];
                    return res.redirect("/");
                } else {
                    res.redirect("/login");
                }
            }

        });
    });

    router.post('/logout', redirectHome, (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/')
            }

            res.clearCookie('user_sid');
            res.redirect('/login');
        })
    })

    router.get('/register', redirectHome, function (req, res) {
        res.sendFile(__dirname + "/views/register.html");
    });

    router.post('/register', redirectHome, function (req, res) {
        var data = req.body;

        var newUser = {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            mobileno: data.mobile,
            gender: data.gender,
            dob: data.dob,
            password: data.password
        }
        //CHECK IF THE EMAIL EXIST
        user.validateUserByEmail({ email: data.email }, function (err, email) {
            if (err) {
                res.status(500).send("Unable to register");
            } else {
                //IF EMAIL EXIST
                if (email) {
                    //res.send('<script>alert("Email already exist")</script>'); 
                    res.redirect('/login');
                } else {
                    //IF EMAIL DOES NOT EXIST, CHECK IF THE USERNAME EXIST
                    user.validateUserByUsername({ username: data.username }, function (err, username) {
                        if (err) {
                            res.status(500).send("Unable to register");
                        } else {
                            //IF USERNAME EXISTS
                            if (username) {
                                res.redirect('/login');
                            } else {
                                //ADD USER AND THE EMAIL IF THE USERNAME DOES NOT EXIST
                                user.addUser(newUser, function (err, user) {
                                    if (err) {
                                        res.status(500).send("Unable to find add account");
                                    } else {
                                        req.session.user = user;
                                        res.redirect('/');
                                    }
                                })
                            }
                        }
                    })

                }
            }
        });
    });

    // GET ACCOUNT PROFILE PAGE
    router.get('/user/accountprofile', redirectLogin, function (req, res) {
        res.sendFile(__dirname + "/views/accountprofile.html");
    });

    // GET USER DETAILS
    router.get('/user/details', function (req, res) {
        if (req.session.user)
            res.send(req.session.user);
    });

    // router.get('/api', function (req, res) {
    //     request('https://api.themoviedb.org/3/discover/movie?api_key=0de3f58e8f0840a3b37e2736aa311df2', function (error, response, body) {
    //         obj = JSON.parse(response.body);
    //         res.send(response.body);
    //         movie.addMovie(obj.results, function (err,movies) {
    //             // console.log(movies);
    //             console.log(res);
    //         });

    //     });

    // GET SHOWTIME BY THEATREID AND MOVIEID
    // router.get('/showtimes/theatreID/movieID/:theatreID/:movieID', function (req, res) {
    //     var theatreID = req.params.theatreID;
    //     var movieID = req.params.movieID;
    //     showtimes.getShowtimesByIDs(theatreID, movieID, function (err, showtimes) {
    //         if (err) {
    //             res.status(500).send("Unable to retrieve Showtimes");
    //         } else {
    //             res.status(200).send(showtimes);
    //         }
    //     })
    // });

    // });

    // router.get('/genre/movie/list', function (req, res) {
    //     request('https://api.themoviedb.org/3/genre/movie/list?api_key=0de3f58e8f0840a3b37e2736aa311df2&language=en-US', function (error, response, body) {
    //         obj = JSON.parse(response.body);
    //         console.log(obj.genres);
    //         movie.addGenre(obj.genres, function (err) {
    //             // console.log(movies);
    //             console.log(res);
    //         });

    //     });
    // });



    // router.post('/addgenre',function(req,res){
    //     var data = req.body;    
    //     movie.addGenre(data.description,function (err, genres) {
    //         if (err) {
    //             res.status(500).send("Unable to add genre");
    //         } else { 
    //             res.status(200).send(genres); 
    //         }
    //     });  
    // }),

    // router.get('/genres', function (req, res) {
    //     genre.getGenres(function (err, genres) {
    //         if (err) {
    //             res.status(500).send("Unable to retrieve genres");
    //         } else {
    //             res.status(200).send(genres);

    //         }
    //     })
    // });

    router.get('/movie', function (req, res) {
        res.sendFile(__dirname + "/views/moviedetails.html");
    });

    // GET ALL MOVIES
    // router.get('/movies', function (req, res) {
    //     movie.getMovies(function (err, movies) {
    //         if (err) {
    //             res.status(500).send("Unable to find movies");
    //         } else {
    //             res.status(200).send(movies);
    //         }
    //     })
    // });

    // // GET MOVIES BY PARTIAL TEXT
    // router.get('/movies/search/:partialtext', function (req, res) {
    //     var partialtext = req.params.partialtext;
    //     movie.getMovieByPartialText(partialtext, function (err, movies) {
    //         if (err) {
    //             res.status(500).send("Unable to find movie");
    //         } else {
    //             res.status(200).send(movies);
    //         }
    //     })
    // });


    // // GET MOVIE BY ID
    // router.get('/movie/:id', function (req, res) {
    //     var id = req.params.id;
    //     movie.getMovieById(id, function (err, movie) {
    //         if (err) {
    //             console.log("Error processing data");
    //         }
    //         res.send(movie);
    //     })
    // });

    // router.get('/admin/addshowtimes', function (req, res) {
    //     res.sendFile(__dirname + "/views/assigninghalls.html");
    // });

    router.get('/admin/addmovie', function (req, res) {
        res.sendFile(__dirname + "/views/addmovie.html");
    });

    // GET ALL SHOWTIMES
    // router.get('/showtimes', function (req, res) {
    //     showtimes.getShowTimes(function (err, showtimes) {
    //         if (err) {
    //             res.status(500).send("Unable to retrieve showtimes");
    //         } else {
    //             res.status(200).send(showtimes);

    //         }
    //     })
    // });

    // // GET ALL HALLS
    // router.get('/halls', function (req, res) {
    //     seating.getAllHalls(function (err, halls) {
    //         if (err) {
    //             res.status(500).send("Unable to find halls");
    //         } else {
    //             res.status(200).send(halls);
    //         }
    //     })
    // });

    // // GET HALL BY ID
    // router.get('/halls/:id', function (req, res) {
    //     seating.getHallByID(req.params.id, function (err, hall) {
    //         if (err) {
    //             res.status(500).send("Unable to find hall");
    //         } else {
    //             res.status(200).send(hall);
    //         }
    //     })
    // });

    // GET BOOKTICKETS PAGE
    router.get('/user/booktickets', redirectLogin, function (req, res) {
        res.sendFile(__dirname + "/views/booktickets.html");
    });





    // // GET SHOWTIMES BY MOVIEID
    // router.get('/user/showtimes/:movieID', function (req, res) {
    //     var id = req.params.movieID;
    //     showtimes.getShowTimesByMovieID(id, function (err, showtimes) {
    //         if (err) {
    //             res.status(500).send("Unable to find showtimes");
    //         } else {
    //             res.status(200).send(showtimes);
    //         }
    //     });
    // });

    // // GET MOVIES BY THEATREID 
    // router.get('/user/theatres/:theatreid', function (req, res) {
    //     var id = req.params.theatreid;
    //     showtimes.getMoviesByTheatreID(id, function (err, movies) {
    //         if (err) {
    //             res.status(500).send("Unable to find Movies");
    //         } else {
    //             res.status(200).send(movies);
    //         }
    //     });
    // });

    // // GET MOVIEIDS BY THEATREID 
    // router.get('/showtimes/moviesID/:theatreid', function (req, res) {
    //     var id = req.params.theatreid;
    //     showtimes.getMoviesIDByTheatreID(id, function (err, movieID) {
    //         if (err) {
    //             res.status(500).send("Unable to find Movies");
    //         } else {
    //             res.status(200).send(movieID);
    //         }
    //     });
    // });

    // // GET SHOWTIME BY ID
    // router.get('/user/showtimes/time/:showtimeid', function (req, res) {
    //     var showtimeid = req.params.showtimeid;
    //     showtimes.getShowTimeById(showtimeid, function (err, showtime) {
    //         if (err) {
    //             res.status(500).send("Unable to find date");
    //         } else {
    //             res.status(200).send(showtime);
    //         }
    //     });
    // });

    // GET ALL THEATRES
    router.get('/theatres', function (req, res) {
        theatres.getTheatres(function (err, theatres) {
            if (err) {
                res.status(500).send("Unable to find threatres");
            } else {
                res.status(200).send(theatres);
            }
        })
    });


    // // GET REVIEWS BY MOVIEID - get reviews for the selected movie
    // router.get('/reviews/:movieid', function (req, res) {
    //     var movieid = req.params.movieid;
    //     reviews.getReviewsByMovieID(movieid, function (err, reviews) {
    //         if (err) {
    //             res.status(500).send("Unable to add reviews");
    //         } else {
    //             res.status(200).send(reviews);
    //         }
    //     });
    // });

    router.get('/tickets', function (req, res) {
        ticket.getTickets(function (err, tickets) {
            if (err) {
                res.status(500).send("Unable to get tickets");
            } else {
                res.status(200).send(tickets);
            }
        })
    });

    router.get('/ticket/:id', function (req, res) {
        ticket.getTicketById(req.params.id, function (err, tickets) {
            if (err) {
                res.status(500).send("Unable to get ticket");
            } else {
                res.status(200).send(tickets);
            }
        })
    });

    router.get('/viewseats', function (req, res) {
        res.sendFile(__dirname + "/views/viewseats.html");
    });

    router.get('/payment', function (req, res) {
        res.sendFile(__dirname + "/views/cart.html");
    })

    // ADD REVIEW
    // router.post('/user/reviews/:movieid', redirectLogin, function (req, res) {
    //     // GET USER DETAILS - get the username

    //     var review = {
    //         movieID: req.params.movieid,
    //         username: req.session.user.username,
    //         description: req.body.description,
    //         totalratings: req.body.totalratings
    //     }
    //     // ADD REVIEW
    //     reviews.addReview(review, function (err, review) {
    //         if (err) {
    //             res.status(500).send("Unable to add reviews");
    //         } else {
    //             res.end();
    //         }
    //     })
    // });

    // router.post("/user/payment", function (req, res) {
    //     if (req.session.cart) {
    //         var points = (req.session.cart.totalprice - req.session.cart.totalprice % 5) / 5;
    //         var totalpoints = points + req.session.user.points;

    //         user.updatePointsByID(req.session.user._id, totalpoints, function (err) {
    //             if (err) {
    //                 res.status(500).send("Unable to update points");
    //             } else {
    //                 booking.addBooking(req.session.user._id, req.session.cart, function (err) {
    //                     if (err) {
    //                         res.status(500).send("Unable to add booking");
    //                     } else {
    //                         res.status(200).send("Booking added successfully");
    //                     }
    //                 })
    //             }
    //         })

    //     }
    // })

    // router.post("/cart", function (req, res) {
    //     var data = "";
    //     if (!req.body.cart) {
    //         data = req.body;
    //     } else {
    //         data = JSON.parse(req.body.cart);
    //     }
    //     req.session.cart = data;
    //     res.redirect('/viewseats');
    // })

    // router.get("/cart", function (req, res) {
    //     if (req.session.cart) {
    //         res.send(req.session.cart);
    //     } else {
    //         res.send("There are no items in the cart");
    //     }
    // })

    router.get("/admin", function (req, res) {
        res.sendFile(__dirname + "/views/adminhomepage.html");
    });

    router.get("/booking",function(req,res){
        var newBooking = {
            movieID: req.query.movieID,
            date: req.query.date,
            time: req.query.time
        };

        booking.getBooking(newBooking,function (err, booking) {
            if(err) {
                res.status(500).send("Unable to find booking");
            } else {
                res.status(200).send(booking);
            }
        })
    });

    return router;
};

module.exports = routes();
