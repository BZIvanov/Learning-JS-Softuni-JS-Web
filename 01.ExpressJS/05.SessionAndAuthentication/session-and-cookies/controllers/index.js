const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.home = (req, res) => {
  res.render('home');
};

exports.loginGet = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render('login', { err: error });
};

exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.session.error = 'Invalid Credentials';
    return res.redirect('/login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.session.error = 'Invalid Credentials';
    return res.redirect('/login');
  }

  req.session.isAuth = true;
  req.session.username = user.username;
  res.redirect('/profile');
};

exports.registerGet = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render('register', { err: error });
};

exports.registerPost = async (req, res) => {
  const { username, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    req.session.error = 'User already exists';
    return res.redirect('/register');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
  res.redirect('/login');
};

exports.profileGet = (req, res) => {
  const username = req.session.username;
  res.render('profile', { name: username });
};

exports.logoutPost = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
};
