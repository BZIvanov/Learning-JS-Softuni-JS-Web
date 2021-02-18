const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  name: { type: String, required: true, unique: true },
  // ref property is reference to another Collection in the database
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = model('Category', categorySchema);
