const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = (app) => {
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
