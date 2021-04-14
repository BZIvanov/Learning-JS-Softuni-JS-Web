const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Message require some content please :('],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A message needs User(receiver)'],
  },
  thread: {
    type: Schema.Types.ObjectId,
    required: [true, 'A meesage needs the thread it belongs to'],
  },
});

module.exports = model('Message', messageSchema);
