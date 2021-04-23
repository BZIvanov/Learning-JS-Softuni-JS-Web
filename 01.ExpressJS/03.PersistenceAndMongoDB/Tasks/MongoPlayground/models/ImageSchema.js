const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  url: { type: String, required: true },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

module.exports = model('Image', imageSchema);
