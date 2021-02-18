const { Schema, model } = require('mongoose');

const productSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: 0,
    max: Number.MAX_VALUE,
    default: 0,
  },
  image: { type: String },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

module.exports = model('Product', productSchema);
