const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (config) => {
  mongoose.connect(config.dbPath, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.once('open', (err) => {
    if (err) {
      return console.log(err);
    }

    User.seedAdminUser()
      .then(() => {
        console.log('Database is ready!');
      })
      .catch((reason) => {
        console.log('Something went wrong!');
        console.log(reason);
      });
  });

  db.on('error', (reason) => {
    console.log(reason);
  });
};
