const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Message require some content please :('],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A message needs User(receiver)'],
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A meesage needs the thread it belongs to'],
  },
});

module.exports = mongoose.model('Message', messageSchema);
