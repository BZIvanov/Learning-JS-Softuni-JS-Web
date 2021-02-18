const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const handlebars = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

module.exports = (app) => {
  app.engine(
    '.hbs',
    handlebars({
      defaultLayout: 'layout',
      extname: '.hbs',
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
  );
  app.set('view engine', '.hbs');

  //Configure middleware for parsing form data
  app.use(bodyParser.urlencoded({ extended: true }));

  //Configure "public" folder
  app.use((req, res, next) => {
    if (req.url.startsWith('/content')) {
      req.url = req.url.replace('/content', '');
    }
    next();
  }, express.static(path.normalize(path.join(__dirname, '..', 'content'))));
};
