module.exports = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    req.session.error = 'Please login';
    res.redirect('/login');
  }
};
