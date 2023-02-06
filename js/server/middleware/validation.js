var user = require('../models/user');
const { body } = require('express-validator')


exports.validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('fullname').isLength({ min: 1 }).withMessage('Full name is required'),
        body('username').matches('^[a-zA-Z]{8,12}$', 'i').withMessage('Username must be between 8 - 12 characters').custom((value, {req}) => {
          return new Promise((resolve, reject) => {
            user.validateUserByUsername(req.body.username, function(err, user){
              if(err) {
                reject(new Error('Server Error'))
              }

              if(user != null) {
                console.log(user);
                reject(new Error('Username already in use'))
              } 
              resolve(true)
            });
          });
        }),
        body('email').isLength({ min: 1 }).withMessage("Email is required").custom((value, {req}) => {
          return new Promise((resolve, reject) => {
            user.validateUserByEmail(req.body.email, function(err, user){
              if(err) {
                reject(new Error('Server Error'))
              }

              if(user != null) {
                console.log(user);
                reject(new Error('E-mail already in use'))
              } 
              resolve(true)
            });
          });
        }),
        body('dob').isLength({ min: 1 }).withMessage("Date of Birth is required"),
        body('mobileno').matches('^[89]\\d{7}$', 'i').withMessage("Mobile number should start with '8' or '9' and only consists of 8 numbers."),
        body('password').isLength({ min: 1 }).withMessage("Password is required"),
        body('cpassword').isLength({ min: 1 }).withMessage("Confirm Password is required").custom((value,{req}) => {
          if (value !== req.body.password) {
            throw new Error('Password and confirm password does not match');
          }

          return true;
        })
      ]
    }

    case 'login': {
      return [
        body('username').isLength({ min: 1 }).withMessage('Username is required'),
        body('password').isLength({ min: 1 }).withMessage('Password is required')
      ] 
    }

    case 'update': {
      return [
        body('fullname').isLength({ min: 1 }).withMessage('Full name is required'),
        body('mobileno').matches('^[89]\\d{7}$', 'i').withMessage("Mobile number should start with '8' or '9' and only consists of 8 numbers.")
      ] 
    }
  }
}



