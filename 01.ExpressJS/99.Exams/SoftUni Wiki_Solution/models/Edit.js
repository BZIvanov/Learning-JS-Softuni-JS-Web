const mongoose = require('mongoose');

const editSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  title: { type: Schema.Types.String },
  content: { type: String, required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article' },
});

const Edit = mongoose.model('Edit', editSchema);
module.exports = Edit;
