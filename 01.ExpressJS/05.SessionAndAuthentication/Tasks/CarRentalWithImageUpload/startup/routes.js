const commonRoutes = require('../routes/common');
const usersRoutes = require('../routes/user');
const carsRoutes = require('../routes/car');

module.exports = function (app) {
  app.use('/', commonRoutes);
  app.use('/user', usersRoutes);
  app.use('/car', carsRoutes);
  // app.all will includes all possible requests(GET, POST, ...) and here is important handling '*' to be the last router in this file, because we will always hit this router if none of above matches.
  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found');
    res.end();
  });
};
