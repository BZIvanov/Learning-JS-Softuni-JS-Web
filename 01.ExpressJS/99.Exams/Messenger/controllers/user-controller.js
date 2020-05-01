const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register');
  },
  // async and awaits must always be wrapped in try catch block in case of error
  registerPost: async (req, res) => {
    const reqUser = req.body;
    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(
      salt,
      reqUser.password
    );
    try {
      const user = await User.create({
        username: reqUser.username,
        hashedPass,
        salt,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        roles: [],
      });
      //logIn method comes from Passport. It goes through the serializeUser function
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err;
          res.render('users/register', user);
        } else {
          req.session.notifyYou = 'Successfully registered';
          res.redirect('/');
        }
      });
    } catch (e) {
      console.log(e);
      res.locals.globalError = e;
      res.render('users/register');
    }
  },
  logout: (req, res) => {
    //logout is built-in Passport method which will clear the session and cookies
    req.logout();
    res.redirect('/');
  },
  loginGet: (req, res) => {
    res.render('users/login');
  },
  loginPost: async (req, res) => {
    const reqUser = req.body;
    try {
      const user = await User.findOne({ username: reqUser.username });
      if (!user) {
        errorHandler('Invalid user data');
        return;
      }
      if (!user.authenticate(reqUser.password)) {
        errorHandler('Invalid user data');
        return;
      }
      req.logIn(user, (err, user) => {
        if (err) {
          errorHandler(err);
        } else {
          res.redirect('/');
        }
      });
    } catch (e) {
      errorHandler(e);
    }

    function errorHandler(e) {
      console.log(e);
      res.locals.globalError = e;
      res.render('users/login');
    }
  },
};
