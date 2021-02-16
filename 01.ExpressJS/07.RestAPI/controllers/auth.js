const { validationResult } = require('express-validator/check');
const User = require('../models/User');

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array(),
    });

    return false;
  }

  return true;
}

module.exports = {
  signUp: (req, res, next) => {
    if (validateUser(req, res)) {
      const { email, password, name } = req.body;
      User.create({
        email,
        password,
        name,
      })
        .then((user) => {
          const token = user.generateAuthToken();
          res
            .header('Authorization', `Bearer ${token}`)
            .status(201)
            .json({ message: 'User created!' });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          // the next below will go to General error middleware handler in  the index.js file
          next(error);
        });
    }
  },
  signIn: (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 401;
          throw error;
        }

        if (!user.authenticate(password)) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 401;
          throw error;
        }

        const token = user.generateAuthToken();

        res.header('Authorization', `Bearer ${token}`).status(200).json({
          message: 'User successfully logged in!',
        });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        // the next below will go to General error middleware handler in  the index.js file
        next(error);
      });
  },
};
