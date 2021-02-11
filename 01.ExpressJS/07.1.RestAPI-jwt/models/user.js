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
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
};

const User = new mongoose.model('User', userSchema);

function validateRegister(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  });
  const { error } = schema.validate(user);
  return error;
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  });
  const { error } = schema.validate(user);
  return error;
}

exports.User = User;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
