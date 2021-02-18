const commonRoutes = require('../routes/common');
const categoryRoutes = require('../routes/category');
const productRoutes = require('../routes/product');

module.exports = (app) => {
  app.use('/', commonRoutes);
  app.use('/category', categoryRoutes);
  app.use('/product', productRoutes);
};
