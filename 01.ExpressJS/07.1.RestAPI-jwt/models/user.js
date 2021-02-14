const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function () {
  try {
    this.password = await bcrypt.hash(this.password, 8);
  } catch (err) {
    throw new Error('Failed while user password hashing.');
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, isAdmin: this.isAdmin === 'admin' },
    process.env.JWT_SECRET
  );
};

userSchema.methods.isPasswordCorrect = async function (incomingPassword) {
  try {
    // this.password already contains the salt which bcrypt will use
    return await bcrypt.compare(incomingPassword, this.password);
  } catch (err) {
    throw new Error('Error with comparing passwords');
  }
};

const User = new model('User', userSchema);

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
