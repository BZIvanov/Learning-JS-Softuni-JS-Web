const { Schema, model } = require('mongoose');

const productSchema = Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: {
    type: Number,
    min: 0,
    max: Number.MAX_VALUE,
    default: 0,
  },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  isBought: { type: Boolean, default: false },
});

module.exports = model('Product', productSchema);
