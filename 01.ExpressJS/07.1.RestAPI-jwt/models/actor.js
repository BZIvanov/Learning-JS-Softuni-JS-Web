const mongoose = require('mongoose');
const Joi = require('joi');

const actorSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  isFamous: { type: Boolean, default: false },
});

function validateActor(actor) {
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
    isFamous: Joi.boolean(),
  });
  const { error } = schema.validate(actor);
  return error;
}

const Actor = new mongoose.model('Actor', actorSchema);

exports.Actor = Actor;
exports.validateActor = validateActor;
