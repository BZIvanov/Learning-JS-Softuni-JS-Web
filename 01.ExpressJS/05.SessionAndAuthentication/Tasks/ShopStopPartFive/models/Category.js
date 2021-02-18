const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  name: { type: String, required: true, unique: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = model('Category', categorySchema);
