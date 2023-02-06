exports.redirectHome = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        next();
    }
}

exports.redirectLogin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/user/login");
    } else {
        next();
    }
}

exports.retrieveToken = (req,res,next) => {
    if(req.session.user) {
      res.send(req.session.user);
    } 
}