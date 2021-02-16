const router = require('express').Router();
const { body } = require('express-validator/check');
const { signUp, signIn } = require('../controllers/auth');
const User = require('../models/User');

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid name.'),
  ],
  signUp
);

router.post('/signin', signIn);

module.exports = router;
