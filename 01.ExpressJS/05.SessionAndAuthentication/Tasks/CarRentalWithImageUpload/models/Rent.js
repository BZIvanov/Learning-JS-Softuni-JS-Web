const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema({
  days: { type: mongoose.Schema.Types.Number, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Car' },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Rent = mongoose.model('Rent', RentSchema);

module.exports = Rent;
