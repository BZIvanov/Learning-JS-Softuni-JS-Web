const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const hbsState = require('../middlewares/hbs-state');
const path = require('path');

module.exports = function (app) {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(hbsState);

  const publicPath = path.normalize(path.join(__dirname, '../public'));
  app.use(express.static(publicPath));
};
