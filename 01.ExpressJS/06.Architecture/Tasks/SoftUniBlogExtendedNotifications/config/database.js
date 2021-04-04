const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (config) => {
  mongoose.connect(config.connectionString, {
    useMongoClient: true,
  });

  const database = mongoose.connection;
  database.once('open', (err) => {
    if (err) throw err;

    User.seedAdmin()
      .then(() => {
        console.log('Database ready!');
      })
      .catch((err) => {
        console.log('Something went wrong');
        console.log(err);
      });
  });
};
