const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'At least 2 users required'],
    },
  ],
  dateCreated: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Thread', threadSchema);
