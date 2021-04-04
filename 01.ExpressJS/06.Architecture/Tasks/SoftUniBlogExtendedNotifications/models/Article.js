const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  date: { type: Date, default: Date.now },
});

module.exports = model('Article', articleSchema);
