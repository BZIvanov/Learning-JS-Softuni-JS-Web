const User = require('mongoose').model('User');

module.exports.registerGet = (req, res) => {
  res.render('user/register');
};

module.exports.registerPost = async (req, res) => {
  const user = { ...req.body };

  if (user.password && user.password !== user.confirmedPassword) {
    return res.render('user/register', { error: 'Passwords do not match' });
  }

  try {
    const newUser = await User.create(user);

    req.logIn(newUser, (error, user) => {
      if (error) {
        return res.render('user/register', {
          error: 'Authenticaton not working!',
        });
      }

      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    res.render('user/register', { error });
  }
};

module.exports.loginGet = (req, res) => {
  res.render('user/login');
};

module.exports.loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !user.isPasswordCorrect(password)) {
      return res.render('user/login', { error: 'Invalid credentials!' });
    }

    req.logIn(user, (error, user) => {
      if (error) {
        return res.render('user/login', {
          error: 'Authenticaton not working!',
        });
      }

      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.logout = (req, res) => {
  //logout is built-in method from passport which will logout user
  req.logout();
  res.redirect('/');
};
