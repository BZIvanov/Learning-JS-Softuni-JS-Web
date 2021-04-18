/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (config) => {
  mongoose.connect(config.dbPath, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.once('open', (err) => {
    if (err) throw err;

    User.seedAdminUser()
      .then(() => {
        console.log('Database ready');
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  });
  db.on('error', (err) => {
    console.log(err);
  });
};
