module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    res.locals.isAdmin = req.user.roles.indexOf('admin') !== -1;
  }
  next();
};
