const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
      .catch((err) => {
        console.log(err);
      });
  });

  db.on('error', (err) => {
    console.log(err);
  });
};
