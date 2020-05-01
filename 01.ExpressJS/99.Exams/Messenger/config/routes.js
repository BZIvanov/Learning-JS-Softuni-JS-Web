const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = (app) => {
  // here we dont call functions just provide them
  app.get('/', controllers.home.index);
  app.get('/users/register', controllers.user.registerGet);
  app.post('/users/register', controllers.user.registerPost);
  app.get('/users/logout', controllers.user.logout);
  app.get('/users/login', controllers.user.loginGet);
  app.post('/users/login', controllers.user.loginPost);

  app.post('/threads/find', controllers.threads.findUser);
  app.post(
    '/message/send',
    restrictedPages.hasRole('User'),
    controllers.threads.sendMessage
  );

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found');
    res.end();
  });
};
