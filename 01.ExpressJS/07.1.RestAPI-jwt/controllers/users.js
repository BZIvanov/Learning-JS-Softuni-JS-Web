const bcrypt = require('bcrypt');
const asyncMiddleware = require('../middlewares/async');
const { User, validateRegister, validateLogin } = require('../models/user');

module.exports.register = asyncMiddleware(async (req, res) => {
  const error = validateRegister(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send('User already exists.');
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);
  user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = user.generateAuthToken();

  res.header('Authorization', `Bearer ${token}`).send({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports.login = asyncMiddleware(async (req, res) => {
  const error = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  // user.password contains the salt which bcrypt will use
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password.');
  }

  const token = user.generateAuthToken();

  res.header('Authorization', `Bearer ${token}`).send({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports.me = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).send('User not found!');
  }

  res.send(user);
});
