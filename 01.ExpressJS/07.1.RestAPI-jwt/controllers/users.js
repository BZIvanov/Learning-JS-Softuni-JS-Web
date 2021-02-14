const asyncMiddleware = require('../middlewares/async');
const { User, validateRegister, validateLogin } = require('../models/user');

module.exports.register = asyncMiddleware(async (req, res) => {
  const error = validateRegister(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;
  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    return res.status(400).send('User already exists.');
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  const token = newUser.generateAuthToken();

  res.header('Authorization', `Bearer ${token}`).status(201).send({
    message: 'Success',
  });
});

module.exports.login = asyncMiddleware(async (req, res) => {
  const error = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  const isCorrect = await user.isPasswordCorrect(password, user.password);
  if (!isCorrect) {
    return res.status(400).send('Invalid email or password.');
  }

  const token = user.generateAuthToken();

  res.header('Authorization', `Bearer ${token}`).send({
    message: 'Success',
  });
});

module.exports.me = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password -role -__v');
  if (!user) {
    return res.status(404).send('User not found!');
  }

  res.send(user);
});
