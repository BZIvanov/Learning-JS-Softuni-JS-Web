const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const homeRoutes = require('../routes/home');
const userRoutes = require('../routes/user');
const productRoutes = require('../routes/product');
const categoryRoutes = require('../routes/category');

module.exports = (app) => {
  //Configure middleware for parsing form data
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user;
    }
    next();
  });

  //Configure "public" folder
  app.use((req, res, next) => {
    if (req.url.startsWith('/content')) {
      req.url = req.url.replace('/content', '');
    }
    next();
  }, express.static(path.normalize(path.join(__dirname, '..', 'content'))));

  app.use('/', homeRoutes);
  app.use('/user', userRoutes);
  app.use('/product', productRoutes);
  app.use('/category', categoryRoutes);
};
