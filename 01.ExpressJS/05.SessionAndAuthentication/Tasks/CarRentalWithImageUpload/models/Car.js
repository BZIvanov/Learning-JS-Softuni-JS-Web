const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  model: { type: mongoose.Schema.Types.String, required: true },
  image: { type: mongoose.Schema.Types.String, required: true },
  pricePerDay: { type: mongoose.Schema.Types.Number, required: true },
  isRented: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
  expiresOn: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: 0,
    ref: 'Rent',
  },
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
