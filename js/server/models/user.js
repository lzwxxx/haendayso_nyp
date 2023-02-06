var mongoose = require("mongoose");
var md5 = require("md5");
var schema = mongoose.Schema;

var userSchema = {};
var UserModel;

var userSchema = schema({
    fullname: String,
    username: String,
    email: String,
    mobileno: String,
    gender: String,
    dob: Date,
    password: String,
    points: Number,
    role: String
});

var UserModel = mongoose.model("User", userSchema);

exports.addAdmin = function (obj, callback) {
    var newUser = new UserModel({
        fullname: obj.fullname,
        username: obj.username,
        email: obj.email,
        mobileno: obj.mobileno,
        gender: obj.gender,
        dob: obj.dob,
        password: md5(obj.password),
        points: 0,
        role: obj.role
    });
    newUser.save(callback);
}

exports.addUser = function (obj, callback) {
    var newUser = new UserModel({
        fullname: obj.fullname,
        username: obj.username,
        email: obj.email,
        mobileno: obj.mobileno,
        gender: obj.gender,
        dob: obj.dob,
        password: md5(obj.password),
        points: 0,
        role: 'User'
    });
    newUser.save(callback);
}

exports.getUserByUsername = function (username, password, callback) {
    UserModel.findOne({ username: username, password: md5(password) }, callback);
}

exports.getUserByID =  function(id, callback) {
    UserModel.findById(id, callback);
}

exports.updatePointsByID =  function(id, points, callback) {
    UserModel.updateMany({ _id: id }, { points: points }, callback);
}

exports.validateUserByEmail =  function(email, callback) {  
    UserModel.findOne( {email: email} , callback);
}

exports.validateUserByUsername = function(username, callback) { 
    UserModel.findOne( { username: username } , callback); 
}

exports.editProfile = function(id, user, callback) {
    UserModel.updateMany({ _id: id }, user, callback);
}
