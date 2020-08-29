const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true, unique: true },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  // ref propert is reference to another Collection in the database
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
