const { Schema, model } = require('mongoose');

const RentSchema = new Schema({
  days: { type: Number, required: true },
  car: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = model('Rent', RentSchema);
