const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
  app.engine(
    '.hbs',
    handlebars({
      // layoutsDir and defaultLayout are predefined properties which set default view for each page. layoutsDir specify directory where the view can be found and defaultLayout property specify the name of the file used for view placed in folder views > layouts
      layoutsDir: 'views/layouts',
      defaultLayout: 'main',
      extname: '.hbs',
    })
  );

  app.use(cookieParser());
  // bodyParser is helping us to get in a easy way data from the request, otherwise we had to use stream and events
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: '123456',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //below is a custom middleware where we attach the data we will use later. For example for home page to say "Hello: User"
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }
    next();
  });

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
      res.locals.isAdmin = req.user.roles.indexOf('Admin') !== -1;
    }
    next();
  });

  app.set('view engine', '.hbs');

  app.use(express.static('./static'));
};
