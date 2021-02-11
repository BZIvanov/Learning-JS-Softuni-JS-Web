const express = require('express');
const usersRoutes = require('../routes/users');
const moviesRoutes = require('../routes/movies');
const globalError = require('../middlewares/error');

module.exports = function (app) {
  app.use(express.json());

  app.use('/api/users', usersRoutes);
  app.use('/api/movies', moviesRoutes);

  app.use(globalError);
};
