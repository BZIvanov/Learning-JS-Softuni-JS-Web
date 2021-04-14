const { Schema, model } = require('mongoose');

const threadSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'At least 2 users required'],
    },
  ],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = model('Thread', threadSchema);
