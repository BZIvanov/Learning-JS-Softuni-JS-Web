const { Schema, model } = require('mongoose');

const CarSchema = new Schema({
  model: { type: String, required: true },
  image: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  isRented: {
    type: Boolean,
    required: true,
    default: false,
  },
  expiresOn: {
    type: Number,
    required: true,
    default: 0,
    ref: 'Rent',
  },
});

module.exports = model('Car', CarSchema);
