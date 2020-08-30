const mongoose = require('mongoose');

const connectStr = 'mongodb://localhost:27017/mongoplayground';

module.exports = () => {
  mongoose.connect(connectStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
