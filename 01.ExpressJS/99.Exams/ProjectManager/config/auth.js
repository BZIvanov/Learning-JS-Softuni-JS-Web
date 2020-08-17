module.exports = {
  isAuthed: (req, res, next) => {
    // isAuthenticated is built-in method in Passport
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  hasRole: (role) => (req, res, next) => {
    // isAuthenticated is built-in method in Passport
    if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  isAnonymous: (req, res, next) => {
    // isAuthenticated is built-in method in Passport
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  },
};
