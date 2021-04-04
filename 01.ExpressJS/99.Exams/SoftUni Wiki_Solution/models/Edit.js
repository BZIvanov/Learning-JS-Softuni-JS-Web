const { Schema, model } = require('mongoose');

const editSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  title: { type: String },
  content: { type: String, required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article' },
});

module.exports = model('Edit', editSchema);
