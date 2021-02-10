const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  });
  const { error } = schema.validate(user);
  return error;
}

const User = new mongoose.model('User', userSchema);

exports.User = User;
exports.validateUser = validateUser;
