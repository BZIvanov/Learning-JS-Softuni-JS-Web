const commonRoutes = require('../routes/common');
const userRoutes = require('../routes/user');
const categoryRoutes = require('../routes/category');
const productRoutes = require('../routes/product');

module.exports = (app) => {
  app.use('/', commonRoutes);
  app.use('/user', userRoutes);
  app.use('/category', categoryRoutes);
  app.use('/product', productRoutes);
};
