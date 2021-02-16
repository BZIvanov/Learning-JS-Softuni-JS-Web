const feedRoutes = require('../routes/posts');
const authRoutes = require('../routes/auth');

module.exports = (app) => {
  app.use('/posts', feedRoutes);
  app.use('/auth', authRoutes);
};
