const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.once('open', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('Database ready');
  });

  db.on('error', (err) => {
    console.log(err);
  });
};
