const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const database = mongoose.connection;

  database.once('open', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Connected!');
  });

  database.on('error', (err) => {
    console.log(err);
    return;
  });

  require('../models/User').seedAdminUser();
};
