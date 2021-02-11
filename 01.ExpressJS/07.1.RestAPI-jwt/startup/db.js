const mongoose = require('mongoose');

module.exports = function () {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Connected to mongoDB'));
  // no need of catch, because we handle process errors
};
