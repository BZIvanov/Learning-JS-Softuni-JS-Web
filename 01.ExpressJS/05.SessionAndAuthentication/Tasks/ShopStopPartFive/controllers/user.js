const User = require('mongoose').model('User');

module.exports.registerGet = (req, res) => {
  res.render('user/register');
};

module.exports.registerPost = (req, res) => {
  const user = { ...req.body };

  if (user.password && user.password !== user.confirmedPassword) {
    res.render('user/register', { error: 'Passwords do not match' });
    return;
  }

  User.create(user)
    .then((user) => {
      req.logIn(user, (error, user) => {
        if (error) {
          res.render('user/register', { error: 'Authenticaton not working!' });
          return;
        }

        res.redirect('/');
      });
    })
    .catch((error) => {
      res.render('user/register', { error });
    });
};

module.exports.loginGet = (req, res) => {
  res.render('user/login');
};

module.exports.loginPost = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).then((user) => {
    if (!user || !user.authenticate(password)) {
      res.render('user/login', { error: 'Invalid credentials!' });
    } else {
      req.logIn(user, (error, user) => {
        if (error) {
          res.render('user/login', { error: 'Authenticaton not working!' });
          return;
        }

        res.redirect('/');
      });
    }
  });
};

module.exports.logout = (req, res) => {
  //logout is built-in method from passport which will logout user
  req.logout();
  res.redirect('/');
};
