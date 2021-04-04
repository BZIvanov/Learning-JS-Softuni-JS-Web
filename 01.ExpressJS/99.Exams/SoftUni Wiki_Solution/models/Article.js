const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isLocked: { type: Boolean, default: false, required: true },
  edits: [{ type: Schema.Types.ObjectId, ref: 'Edit' }],
  creationDate: { type: Date, required: true, default: Date.now },
});

module.exports = model('Article', articleSchema);
